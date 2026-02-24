import type { Category } from "../types/database";
import "../css/project-page.css";

type Props = {
    categories: Category[];
    selectedCategory: number | null;
    onSelectCategory: (id: number | null) => void;
    dates: string[];
    selectedDate: string | null;
    onSelectDate: (date: string | null) => void;
};

export default function Filters({
                                    categories,
                                    selectedCategory,
                                    onSelectCategory,
                                    dates,
                                    selectedDate,
                                    onSelectDate,
                                }: Props) {
    return (
        <div className="filters">
            <select
                value={selectedCategory ?? ""}
                onChange={(e) =>
                    onSelectCategory(e.target.value ? Number(e.target.value) : null)
                }
            >
                <option value="">Alle Kategorien</option>
                {categories.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <select
                value={selectedDate ?? ""}
                onChange={(e) => onSelectDate(e.target.value || null)}
            >
                <option value="">Alle Daten</option>
                {dates.map(d => (
                    <option key={d} value={d}>{d}</option>
                ))}
            </select>
        </div>
    );
}
