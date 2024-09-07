'use client'

import { StatsPanelWrapper } from '@/components/StatsPanelWrapper';
import { ReturnHome } from '@/components/useful';

export default function StatsPage() {

    return (
        <div className="flex flex-col">
            
            <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="flex flex-row justify-between items-center w-full p-6">
                <h1 className="text-2xl font-bold">Stats</h1>
                <div className="ml-auto">
                    <ReturnHome />
                </div>
            </div>
                <StatsPanelWrapper />
            </div>
        </div>

    )
}