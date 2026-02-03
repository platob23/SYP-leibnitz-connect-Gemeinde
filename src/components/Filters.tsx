import type { Category } from "../types/database";

type FiltersProps = {
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
                                    onSelectDate
                                }: FiltersProps) {
    return (
        <div className="filters">
            {/* KATEGORIEN SELECT */}
            <select
                value={selectedCategory || ""}
                onChange={(e) => {
                    const val = e.target.value;
                    onSelectCategory(val ? Number(val) : null);
                }}
            >
                <option value="">Kategorie</option>

                {/* DAS HIER HAT GEFEHLT: Die Schleife über die Kategorien */}
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* DATUM SELECT */}
            <select
                value={selectedDate || ""}
                onChange={(e) => {
                    const val = e.target.value;
                    onSelectDate(val === "" ? null : val);
                }}
            >
                <option value="">Datum</option>

                {dates.map((date) => (
                    <option key={date} value={date}>
                        {date}
                    </option>
                ))}
            </select>
        </div>
    );
}