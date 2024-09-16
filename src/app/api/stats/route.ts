import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Import your prisma instance

export async function GET() {
    // Get total participants
    const totalRecords = await prisma.participant.count();

    // Get count of participants by status
    const statusCounts = await prisma.participant.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
    });

    // Get count by category
    const categoryCounts = await prisma.participant.groupBy({
        by: ['category'],
        _count: {
            category: true,
        },
    });

    // Get cumulative registrations by date
    const registrationsByDate = await prisma.participant.groupBy({
        by: ['createdAt'],
        _count: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    // Get top origin country, state, and town
    const topOrigins = await prisma.participant.groupBy({
        by: ['country', 'state', 'town'],
        _count: {
            town: true,
        },
        orderBy: {
            _count: {
                town: 'desc',
            },
        },
        take: 5,  // Limit to top 5 towns
    });

    return NextResponse.json({
        totalRecords,
        statusCounts,
        categoryCounts,
        registrationsByDate,
        topOrigins,
    });
}
