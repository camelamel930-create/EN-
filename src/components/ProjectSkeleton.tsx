import React from 'react';

interface ProjectSkeletonProps {
  isLight?: boolean;
}

export const ProjectSkeleton: React.FC<ProjectSkeletonProps> = ({ isLight }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`flex flex-col border-t-2 border-t-gray-400 rounded-none overflow-hidden animate-pulse ${
            isLight ? 'bg-gray-200/70 border-x border-b border-gray-300' : 'bg-[#1A1A1A] border-x border-b border-white/5'
          }`}
        >
          {/* Skeleton Visualizer area */}
          <div className={`aspect-[4/3] w-full relative flex items-center justify-center ${
            isLight ? 'bg-gray-300/80' : 'bg-gray-900/80'
          }`}>
            <div className={`w-16 h-16 rounded-full ${isLight ? 'bg-gray-400/50' : 'bg-gray-800/60'}`} />
          </div>

          {/* Skeleton Card Content */}
          <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className={`h-3 w-24 rounded-none ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
                <div className={`h-3 w-12 rounded-none ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
              </div>
              <div className={`h-6 w-3/4 rounded-none ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
              <div className="space-y-2 pt-1">
                <div className={`h-3 w-full rounded-none ${isLight ? 'bg-gray-300/80' : 'bg-gray-800/80'}`} />
                <div className={`h-3 w-5/6 rounded-none ${isLight ? 'bg-gray-300/80' : 'bg-gray-800/80'}`} />
              </div>
            </div>

            <div className={`pt-6 border-t flex gap-2 ${isLight ? 'border-gray-300' : 'border-white/5'}`}>
              <div className={`h-4 w-16 rounded-none ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
              <div className={`h-4 w-20 rounded-none ${isLight ? 'bg-gray-300' : 'bg-gray-800'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
