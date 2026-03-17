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
