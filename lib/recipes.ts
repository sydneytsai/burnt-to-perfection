import fs from "fs";
import path from "path";
import matter from "gray-matter";

const recipesDir = path.join(process.cwd(), "recipes");

export interface RecipeMeta {
  title: string;
  slug: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
}

export interface Recipe extends RecipeMeta {
  content: string; // raw markdown
}

export function getAllRecipes(): RecipeMeta[] {
  const files = fs.readdirSync(recipesDir);

  return files.map((filename) => {
    const filePath = path.join(recipesDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return data as RecipeMeta;
  });
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const fullPath = path.join(recipesDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    ...(data as RecipeMeta),
    content,
  };
}
