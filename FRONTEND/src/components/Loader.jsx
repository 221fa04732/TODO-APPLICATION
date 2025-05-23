export default function Loader() {
    return (
        <div className="w-11/12 mx-auto space-y-6">
            {/* Pending Tasks Loader */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50"></div>
                    <h2 className="text-lg font-medium text-blue-400 whitespace-nowrap">
                        Pending Tasks
                    </h2>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50"></div>
                </div>
                
                {/* Skeleton Items */}
                <div className="bg-stone-800/50 border border-stone-700 rounded-lg p-4 space-y-3 animate-pulse">
                    <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-stone-500 mt-0.5"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-stone-700 rounded w-3/4"></div>
                            <div className="h-3 bg-stone-700/80 rounded w-full"></div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-stone-500 mt-0.5"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-stone-700 rounded w-1/2"></div>
                            <div className="h-8 bg-stone-700/80 rounded w-full"></div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-stone-500 mt-0.5"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-stone-700 rounded w-2/3"></div>
                            <div className="h-3 bg-stone-700/80 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completed Tasks Loader */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50"></div>
                    <h2 className="text-lg font-medium text-blue-400 whitespace-nowrap">
                        Completed Tasks
                    </h2>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 opacity-50"></div>
                </div>
                
                {/* Skeleton Items */}
                <div className="bg-stone-800/50 border border-stone-700 rounded-lg p-4 space-y-3 animate-pulse">
                    <div className="flex items-start gap-3 opacity-70">
                        <div className="h-5 w-5 rounded-full border-2 border-blue-500 bg-blue-500/20 mt-0.5 flex items-center justify-center">
                            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-stone-700 rounded w-3/4"></div>
                            <div className="h-3 bg-stone-700/80 rounded w-full"></div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 opacity-70">
                        <div className="h-5 w-5 rounded-full border-2 border-blue-500 bg-blue-500/20 mt-0.5 flex items-center justify-center">
                            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-stone-700 rounded w-1/2"></div>
                            <div className="h-12 bg-stone-700/80 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}