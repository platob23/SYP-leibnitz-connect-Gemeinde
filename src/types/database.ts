export type Project = {
    id: number;
    titel: string;
    text: string;
    large_description: string;
    category_id: number;
    status_id: number;
    created_at: string;
    updated_at: string;
    image?: string | null;
};

export type Category = {
    id: number;
    name: string;
};

export type Formular = {
    id: number;
    project_id: number | null;
    name: string;
    email: string;
    phone?: string;
    message: string;
    newsletter: boolean;
    created_at: string;
};