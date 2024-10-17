import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Import your prisma instance
export const dynamic = 'force-dynamic';  // Forces dynamic rendering

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

    // Get cumulative registrations by exact createdAt timestamp
    const registrationsByDate = await prisma.participant.groupBy({
        by: ['createdAt'],
        _count: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    // Helper function to format Date object to 'yyyy-mm-dd'
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Manually group by formatted date (ignoring time)
    const groupedByDate = registrationsByDate.reduce((acc: any, curr: any) => {
        const date = formatDate(new Date(curr.createdAt));  // Format to 'yyyy-mm-dd'

        // If date already exists, increment count, otherwise initialize
        if (!acc[date]) {
            acc[date] = { date, count: curr._count.createdAt };
        } else {
            acc[date].count += curr._count.createdAt;
        }

        return acc;
    }, {});

    // Convert the object back to an array of results
    const formattedRegistrationsByDate = Object.values(groupedByDate);

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
        take: 10,  // Limit to top 10 towns
    });

    return NextResponse.json({
        totalRecords,
        statusCounts,
        categoryCounts,
        registrationsByDate: formattedRegistrationsByDate,  // Use formatted registrations
        topOrigins,
    });
}
