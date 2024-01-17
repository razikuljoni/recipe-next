import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("Database Connection Failed");
    }
}

export const GET = async (req, res) => {
    try {
        await main();
        const recipes = await prisma.recipes.findMany();

        return NextResponse.json({ message: "Success", recipes }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req, res) => {
    try {
        const { name, description, ingredients } = await req.json();
        await main();
        const recipe = await prisma.recipes.create({ data: { name, description, ingredients } });
        return NextResponse.json({ message: "Success", recipe }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};