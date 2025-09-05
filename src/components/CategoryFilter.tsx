import { Button } from "./ui/button"

interface CategoryFilterProps{
    activeCategory: string;
    onCategoryChange: (category:string) => void
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
    const categories = [
        { key: 'all', label: 'All Pools' },
        { key: "lending", label: 'Lending' },
        { key: "liquidStaking", label: "Liquid Staking" },
        { key: "yieldAggregator", label: "Yield Aggregator" }
    ]
    
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map(({ key, label }) => (
                <Button 
                    key={key} 
                    onClick={() => onCategoryChange(key)}
                    variant={activeCategory === key ? "default" : "outline"}
                    className={`
                        px-4 py-2 font-medium transition-all
                        ${activeCategory === key 
                            ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                            : "border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                        }
                    `}
                >
                    {label}
                </Button>
            ))}
        </div>
    )
}