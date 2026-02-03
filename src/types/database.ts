export type Project = {
    id: number;
    titel: string;
    text: string;
    category_id: number;
    status: string;
    created_at: string;
    updated_at: string;

    image_url?: string | null;
};
