import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";

   const businesses = await prisma.business.findMany({
     where: {
       status: "APPROVED",

       AND: [
         keyword
           ? {
               OR: [
                 {
                   name: {
                     contains: keyword,
                     mode: "insensitive",
                   },
                 },
                 {
                   address: {
                     contains: keyword,
                     mode: "insensitive",
                   },
                 },
               ],
             }
           : {},

         category
           ? {
               category: {
                 name: {
                   contains: category,
                   mode: "insensitive",
                 },
               },
             }
           : {},

         location
           ? {
               OR: [
                 {
                   area: {
                     name: {
                       contains: location,
                       mode: "insensitive",
                     },
                   },
                 },
                 {
                   district: {
                     name: {
                       contains: location,
                       mode: "insensitive",
                     },
                   },
                 },
                 {
                   state: {
                     name: {
                       contains: location,
                       mode: "insensitive",
                     },
                   },
                 },
               ],
             }
           : {},
       ],
     },

     include: {
       category: { select: { name: true } },
       subCategory: { select: { name: true } },
       area: { select: { name: true } },
       district: { select: { name: true } },
       state: { select: { name: true } },
     },
   });
 const results = businesses.map((b) => ({
  id: b.id,
  name: b.name,
  category: b.category?.name ?? null,
  subCategory: b.subCategory?.name ?? null,
  location: {
    area: b.area?.name ?? null,
    district: b.district?.name ?? null,
    state: b.state?.name ?? null,
  },
  description: b.description?.trim() || "No description available",
 }));

 return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
 } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
