// /app/api/visitors/stats/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming Prisma is set up in lib/prisma

interface Visitor {
    createdAt: Date;
    state: string;
    yearOfBirth: number;
    gender: string;
    occupationField: string;
    organizationType: string;
}

interface HourStats {
    [key: string]: number;
}

interface StateStats {
    [key: string]: number;
}

// Helper function to group visitors by hour of the day
const groupByHour = (visitors: Visitor[]) => {
  const hours: { [key: string]: number } = {}; // Define the type of hours
  visitors.forEach(visitor => {
    const hour = new Date(visitor.createdAt).getHours();
    const label = `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`;
    hours[label] = (hours[label] || 0) + 1;
  });
  return hours;
};

// Helper function to group visitors by state
const groupByState = (visitors: Visitor[]) => {
  const states: { [key: string]: number } = {}; // Define the type of states
  visitors.forEach(visitor => {
    states[visitor.state] = (states[visitor.state] || 0) + 1;
  });
  return states;
};

// Helper function to group visitors by age
const groupByAge = (visitors: Visitor[], currentYear: number) => {
  const ageGroups: { [key: string]: number } = {
    '20-30': 0,
    '31-40': 0,
    '41-50': 0,
    '51-60': 0,
    '61+': 0,
  };

  visitors.forEach(visitor => {
    const age = currentYear - visitor.yearOfBirth;
    if (age >= 20 && age <= 30) ageGroups['20-30']++;
    else if (age >= 31 && age <= 40) ageGroups['31-40']++;
    else if (age >= 41 && age <= 50) ageGroups['41-50']++;
    else if (age >= 51 && age <= 60) ageGroups['51-60']++;
    else if (age >= 61) ageGroups['61+']++;
  });

  return ageGroups;
};

// Helper function to calculate gender statistics
const calculateGenderStats = (visitors: Visitor[]) => {
  const genderStats: { male: number, female: number } = { male: 0, female: 0 };
  visitors.forEach(visitor => {
    if (visitor.gender === 'Lelaki') {
      genderStats.male++;
    } else if (visitor.gender === 'Perempuan') {
      genderStats.female++;
    }
  });
  return genderStats;
};

const calculateByBidangPekerjaan = (visitors: Visitor[]) => {
  const bidangPekerjaanStats: { [key: string]: number } = {};
  visitors.forEach(visitor => {
    bidangPekerjaanStats[visitor.occupationField] = (bidangPekerjaanStats[visitor.occupationField] || 0) + 1;
  });
  return bidangPekerjaanStats;
};

const calculateByJenisOrganisasi = (visitors: Visitor[]) => {
  const jenisOrganisasiStats: { [key: string]: number } = {};
  visitors.forEach(visitor => {
    jenisOrganisasiStats[visitor.organizationType] = (jenisOrganisasiStats[visitor.organizationType] || 0) + 1;
  });
  return jenisOrganisasiStats;
};

export async function GET() {
  try {
    // Fetch all visitors from the database
    const visitors = await prisma.visitor.findMany();
    const currentYear = new Date().getFullYear();

    // Calculate stats
    const totalVisitors = visitors.length;
    const visitorsByHour = groupByHour(visitors);
    const visitorsByState = groupByState(visitors);
    const ageGroups = groupByAge(visitors, currentYear);
    const genderStats = calculateGenderStats(visitors);
    const bidangPekerjaanStats = calculateByBidangPekerjaan(visitors);
    const jenisOrganisasiStats = calculateByJenisOrganisasi(visitors);

    // Return the stats in the required format
    return NextResponse.json({
      totalVisitors,
      visitorsByHour,
      visitorsByState,
      genderStats,
      ageGroups,
      bidangPekerjaanStats,
      jenisOrganisasiStats,
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json({ error: 'Failed to fetch visitor stats' }, { status: 500 });
  }
}
