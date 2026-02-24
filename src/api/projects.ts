import { supabase } from "./supabaseClient";
import type {Category, Project} from "../types/database";

export async function getProjects(): Promise<Project[]> {
    const {data, error} = await supabase
        .from("Project")
        .select("*")
        .order("created_at", {ascending: false});

    console.log("Supabase Data:", data);
    console.log("Supabase Error:", error);

    if (error) {
        throw error;
    }

    return data as Project[];

}
    export async function getCategories(): Promise<Category[]> {
        const { data, error } = await supabase
            .from("Category")
            .select("id, name")
            .order("name", { ascending: true });

        console.log("Supabase Categories:", data);
        console.log("Supabase Categories Error:", error);

        if (error) {
            throw error;
        }

        return data as Category[];
    }

export async function addProject(
    project: Omit<Project, "id" | "updated_at" | "created_at">
): Promise<Project[]> {
    const { data, error } = await supabase
        .from("Project")
        .insert(project)
        .select();

    if (error) {
        throw error;
    }

    return data as Project[];
}