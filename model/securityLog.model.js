import mongoose from "mongoose";

const securityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true,
    index: true
  },
  subTopic: {
    type: String,
    required: true,
    index: true
  },
  level: {
    type: String,
    required: true,
    enum: ['easy', 'intermediate', 'advanced'],
    index: true
  },
  violationType: {
    type: String,
    required: true,
    enum: ['fullscreen', 'tab', 'copy', 'contextmenu', 'selection'],
    index: true
  },
  violationCount: {
    type: Number,
    required: true,
    min: 1
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  userAgent: {
    type: String,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  },
  sessionId: {
    type: String,
    required: false
  },
  examSessionId: {
    type: String,
    required: false
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  resolved: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
securityLogSchema.index({ userId: 1, timestamp: -1 });
securityLogSchema.index({ course: 1, level: 1, timestamp: -1 });
securityLogSchema.index({ violationType: 1, timestamp: -1 });

// Virtual for formatted timestamp
securityLogSchema.virtual('formattedTimestamp').get(function() {
  return this.timestamp.toLocaleString();
});

// Method to calculate severity based on violation type and count
securityLogSchema.methods.calculateSeverity = function() {
  const severityMap = {
    fullscreen: { low: 1, medium: 2, high: 3, critical: 5 },
    tab: { low: 1, medium: 2, high: 3, critical: 5 },
    copy: { low: 1, medium: 2, high: 3, critical: 4 },
    contextmenu: { low: 1, medium: 2, high: 3, critical: 4 },
    selection: { low: 1, medium: 3, high: 5, critical: 7 }
  };

  const thresholds = severityMap[this.violationType] || severityMap.copy;
  
  if (this.violationCount >= thresholds.critical) return 'critical';
  if (this.violationCount >= thresholds.high) return 'high';
  if (this.violationCount >= thresholds.medium) return 'medium';
  return 'low';
};

// Pre-save middleware to set severity
securityLogSchema.pre('save', function(next) {
  this.severity = this.calculateSeverity();
  next();
});

// Static method to get violation statistics
securityLogSchema.statics.getViolationStats = async function(filters = {}) {
  const matchStage = {};
  
  if (filters.course) matchStage.course = filters.course;
  if (filters.level) matchStage.level = filters.level;
  if (filters.violationType) matchStage.violationType = filters.violationType;
  if (filters.startDate || filters.endDate) {
    matchStage.timestamp = {};
    if (filters.startDate) matchStage.timestamp.$gte = new Date(filters.startDate);
    if (filters.endDate) matchStage.timestamp.$lte = new Date(filters.endDate);
  }

  return await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          violationType: "$violationType",
          severity: "$severity"
        },
        count: { $sum: 1 },
        uniqueUsers: { $addToSet: "$userId" }
      }
    },
    {
      $group: {
        _id: "$_id.violationType",
        totalViolations: { $sum: "$count" },
        uniqueUsers: { $sum: { $size: "$uniqueUsers" } },
        severityBreakdown: {
          $push: {
            severity: "$_id.severity",
            count: "$count"
          }
        }
      }
    }
  ]);
};

export const SecurityLogModel = mongoose.model("SecurityLog", securityLogSchema);
