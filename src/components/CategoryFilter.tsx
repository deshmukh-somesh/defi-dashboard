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
       <div className="flex flex-wrap gap-3 p-1 bg-muted/30 rounded-lg border border-border">
           {categories.map(({ key, label }) => (
               <Button 
                   key={key} 
                   onClick={() => onCategoryChange(key)}
                   variant={activeCategory === key ? "default" : "ghost"}
                   size="sm"
                   className={`
                       relative px-4 py-2 font-medium transition-all duration-200 rounded-md cursor-pointer
                       ${activeCategory === key 
                           ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl ring-2 ring-primary/20" 
                           : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent hover:border-border"
                       }
                   `}
               >
                   {activeCategory === key && (
                       <div className="absolute inset-0 bg-gradient-to-r from-chart-1/10 to-chart-3/10 rounded-md" />
                   )}
                   <span className="relative z-10">{label}</span>
               </Button>
           ))}
       </div>
   )
}