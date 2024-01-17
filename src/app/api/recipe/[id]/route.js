import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { main } from "../route";

export const GET = async (req, res) => {
    try {
        const id = req.url.split("/recipe/")[1];
        await main();
        const recipe = await prisma.recipes.findFirst({ where: { id } });
        if (!recipe)
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        return NextResponse.json({ message: "Success", recipe }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const PUT = async (req, res) => {
    try {
        const id = req.url.split("/recipe/")[1];
        const { name, description, ingredients } = await req.json();
        await main();
        const recipe = await prisma.recipes.update({
            data: { name, description, ingredients },
            where: { id },
        });
        return NextResponse.json({ message: "Success", recipe }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const DELETE = async (req, res) => {
    try {
        const id = req.url.split("/recipe/")[1];
        await main();
        const recipe = await prisma.recipes.delete({ where: { id } });
        return NextResponse.json({ message: "Success", recipe }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};