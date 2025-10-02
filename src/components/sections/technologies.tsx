import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    ReactLogo, 
    NextjsLogo, 
    VueLogo, 
    TailwindCssLogo, 
    WordPressLogo, 
    NodejsLogo, 
    LaravelLogo,
    FirebaseLogo,
    MySqlLogo,
    MongoDbLogo,
    DockerLogo
} from '@/components/tech-icons';
import { Github, GitMerge, Server } from 'lucide-react';

const techCategories = [
    {
        title: 'Frontend',
        technologies: [
            { name: 'React', icon: <ReactLogo className="h-5 w-5" /> },
            { name: 'Next.js', icon: <NextjsLogo className="h-5 w-5" /> },
            { name: 'Vue', icon: <VueLogo className="h-5 w-5" /> },
            { name: 'React Native', icon: <ReactLogo className="h-5 w-5" /> },
            { name: 'TailwindCSS', icon: <TailwindCssLogo className="h-5 w-5" /> },
            { name: 'WordPress', icon: <WordPressLogo className="h-5 w-5" /> },
        ],
    },
    {
        title: 'Backend',
        technologies: [
            { name: 'NodeJS', icon: <NodejsLogo className="h-5 w-5" /> },
            { name: 'Express', icon: null },
            { name: 'Laravel', icon: <LaravelLogo className="h-5 w-5" /> },
            { name: 'Firebase', icon: <FirebaseLogo className="h-5 w-5" /> },
        ],
    },
    {
        title: 'Bases de datos',
        technologies: [
            { name: 'MySQL', icon: <MySqlLogo className="h-5 w-5" /> },
            { name: 'MongoDB', icon: <MongoDbLogo className="h-5 w-5" /> },
            { name: 'Firebase', icon: <FirebaseLogo className="h-5 w-5" /> },
        ],
    },
    {
        title: 'Otros',
        technologies: [
            { name: 'GitHub', icon: <Github className="h-5 w-5" /> },
            { name: 'Docker', icon: <DockerLogo className="h-5 w-5" /> },
            { name: 'APIs REST', icon: <Server className="h-5 w-5" /> },
            { name: 'CI/CD', icon: <GitMerge className="h-5 w-5" /> },
        ],
    },
];

export function Technologies() {
    return (
        <section id="tech" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    🛠️ Tecnologías
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {techCategories.map((category) => (
                        <Card key={category.title} className="shadow-md transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.technologies.map((tech) => (
                                        <Badge key={tech.name} variant="default" className="flex items-center gap-2 py-1 px-3">
                                            {tech.icon}
                                            <span>{tech.name}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
