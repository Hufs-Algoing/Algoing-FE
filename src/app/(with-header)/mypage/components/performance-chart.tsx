// components/PerformanceChart.tsx
"use client";

import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";


export function PerformanceChart() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          난이도별 해결률
        </h3>
        <Award className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {[
          {
            level: "Level 1",
            solved: 3,
            total: 5,
            color: "from-emerald-400 to-emerald-600",
            bgColor: "bg-emerald-50",
          },
          {
            level: "Level 2",
            solved: 1,
            total: 4,
            color: "from-blue-400 to-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            level: "Level 3",
            solved: 1,
            total: 4,
            color: "from-amber-400 to-amber-600",
            bgColor: "bg-amber-50",
          },
          {
            level: "Level 4",
            solved: 0,
            total: 2,
            color: "from-orange-400 to-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            level: "Level 5",
            solved: 0,
            total: 0,
            color: "from-red-400 to-red-600",
            bgColor: "bg-red-50",
          },
        ].map((item, index) => (
          <motion.div
            key={item.level}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-xl ${item.bgColor} border border-gray-100`}
          >
            <span className="text-sm font-medium text-gray-700 w-16">
              {item.level}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    item.total > 0
                      ? `${(item.solved / item.total) * 100}%`
                      : "0%",
                }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-sm`}
              ></motion.div>
            </div>
            <span className="text-sm font-bold text-gray-700 w-12">
              {item.solved}/{item.total}
            </span>
            <span className="text-xs text-gray-500 w-12">
              {item.total > 0
                ? Math.round((item.solved / item.total) * 100)
                : 0}
              %
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
