import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";


interface CategoryCardProps {
    title: string;
    description: string;
    icon : LucideIcon;
    difficulty: string;
    questionCount: number;
    estimatedTime: string;
    onClick: () => void;
}

const CategoryCard = ({
    title,
    description,
    icon: Icon,
    difficulty,
    questionCount,
    estimatedTime,
    onClick
}: CategoryCardProps) => {
    const getDifficultyColor = (diff: string)=> {
        switch(diff.toLowerCase()) {
            case 'easy' : return 'bg-green-500/20 text-green-400 border-green';
            case 'medium' : return 'bg-yellow-500/20 text-yellow-400 border-yellow';
            case 'hard' : return 'bg-red-500/20 text-red-400 border-red';
            default: return 'bg-primary/20 text-primary border-primary/30';
        }
    };

    return (
        <Card 
        className='group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-card/80 backdrop-blur border-border hover:border-primary/40'
        onClick={onClick}
        >
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Icon className='w-8 h-8 text-primary group-hover:text-primary/80 transition-colors'/>
                    <Badge className={`${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                    </Badge>
                </div>
                <CardTitle className='text-foreground group-hover:text-primary transition-colors'>
                    {title}
                </CardTitle>
                <CardDescription className='text-foreground group-hover:text-primary transition-color'>
                    {title}
                </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{questionCount} question</span>
                <span> {estimatedTime} </span>
            </div>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;