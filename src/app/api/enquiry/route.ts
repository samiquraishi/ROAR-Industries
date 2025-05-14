import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const enquiry = await Enquiry.create(body);

    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('ENQUIRY API ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Something went wrong',
        details: error
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: enquiries },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Something went wrong' 
      },
      { status: 400 }
    );
  }
} 