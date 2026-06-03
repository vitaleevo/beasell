"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Switch } from "@/shared/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Loader2, Save } from "lucide-react";

const courseSchema = z
  .object({
    title: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres"),
    slug: z
      .string()
      .trim()
      .min(3, "O slug deve ter pelo menos 3 caracteres")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens"),
    description: z.string().trim().min(10, "A descrição curta deve ter pelo menos 10 caracteres"),
    fullDescription: z.string().optional(),
    thumbnailUrl: z.string().trim().url("Insira um URL válido para a imagem"),
    price: z.number().min(0, "O preço não pode ser negativo"),
    currency: z.enum(["AOA", "USD", "EUR"]),
    category: z.string().optional(),
    level: z.enum(["Iniciante", "Intermediário", "Avançado", "Profissional"]),
    language: z.enum(["pt", "en", "fr"]),
    tagsText: z.string().optional(),
    objectivesText: z.string().optional(),
    requirementsText: z.string().optional(),
    instructorName: z.string().optional(),
    isFree: z.boolean(),
    allowPreview: z.boolean(),
    hasPromotion: z.boolean(),
    isPublished: z.boolean(),
    certificateEnabled: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (!values.isFree && values.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Defina um preço maior que zero ou marque o curso como gratuito",
        path: ["price"],
      });
    }
  });

type CourseDraftValues = z.infer<typeof courseSchema>;

export type CourseFormValues = {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  thumbnailUrl: string;
  price: number;
  currency?: string;
  category?: string;
  level?: string;
  language?: string;
  tags?: string[];
  objectives?: string[];
  requirements?: string[];
  instructorName?: string;
  isFree?: boolean;
  allowPreview?: boolean;
  hasPromotion?: boolean;
  isPublished: boolean;
  certificateEnabled: boolean;
};

interface CourseFormProps {
  initialValues?: CourseFormValues;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  loading?: boolean;
}

const defaultPayload: CourseFormValues = {
  title: "",
  slug: "",
  description: "",
  fullDescription: "",
  thumbnailUrl: "",
  price: 0,
  currency: "AOA",
  category: "Vendas",
  level: "Intermediário",
  language: "pt",
  tags: [],
  objectives: [],
  requirements: [],
  instructorName: "",
  isFree: false,
  allowPreview: true,
  hasPromotion: false,
  isPublished: false,
  certificateEnabled: true,
};

function optionalText(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function splitTags(value: string | undefined) {
  return (value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value: string | undefined) {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toDraftValues(values?: CourseFormValues): CourseDraftValues {
  const payload = { ...defaultPayload, ...values };

  return {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    fullDescription: payload.fullDescription ?? "",
    thumbnailUrl: payload.thumbnailUrl,
    price: payload.price,
    currency: (payload.currency ?? "AOA") as CourseDraftValues["currency"],
    category: payload.category ?? "",
    level: (payload.level ?? "Intermediário") as CourseDraftValues["level"],
    language: (payload.language ?? "pt") as CourseDraftValues["language"],
    tagsText: payload.tags?.join(", ") ?? "",
    objectivesText: payload.objectives?.join("\n") ?? "",
    requirementsText: payload.requirements?.join("\n") ?? "",
    instructorName: payload.instructorName ?? "",
    isFree: payload.isFree ?? payload.price <= 0,
    allowPreview: payload.allowPreview ?? true,
    hasPromotion: payload.hasPromotion ?? false,
    isPublished: payload.isPublished,
    certificateEnabled: payload.certificateEnabled,
  };
}

function toPayload(values: CourseDraftValues): CourseFormValues {
  const isFree = values.isFree;

  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    description: values.description.trim(),
    fullDescription: optionalText(values.fullDescription),
    thumbnailUrl: values.thumbnailUrl.trim(),
    price: isFree ? 0 : values.price,
    currency: values.currency,
    category: optionalText(values.category),
    level: values.level,
    language: values.language,
    tags: splitTags(values.tagsText),
    objectives: splitLines(values.objectivesText),
    requirements: splitLines(values.requirementsText),
    instructorName: optionalText(values.instructorName),
    isFree,
    allowPreview: values.allowPreview,
    hasPromotion: values.hasPromotion,
    isPublished: values.isPublished,
    certificateEnabled: values.certificateEnabled,
  };
}

export function CourseForm({ initialValues, onSubmit, loading }: CourseFormProps) {
  const defaultValues = useMemo(() => toDraftValues(initialValues), [initialValues]);
  const form = useForm<CourseDraftValues>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });
  const isFree = useWatch({ control: form.control, name: "isFree" });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(toPayload(values)))}
        className="space-y-8"
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do curso</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Mestres das Vendas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="mestres-vendas-mercado-angolano" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Input placeholder="Vendas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Iniciante">Iniciante</SelectItem>
                            <SelectItem value="Intermediário">Intermediário</SelectItem>
                            <SelectItem value="Avançado">Avançado</SelectItem>
                            <SelectItem value="Profissional">Profissional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pt">Português</SelectItem>
                            <SelectItem value="en">Inglês</SelectItem>
                            <SelectItem value="fr">Francês</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição curta</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Resumo que aparece no catálogo e na página do curso."
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição completa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detalhe a promessa, o método, os resultados esperados e o contexto do curso."
                          className="min-h-44"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plano de aprendizagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="objectivesText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivos</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            "Fechar vendas com mais segurança\nCriar uma rotina de prospecção\nNegociar sem baixar preço"
                          }
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirementsText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requisitos</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            "Acesso à internet\nDisponibilidade para exercícios práticos"
                          }
                          className="min-h-28"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagsText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="vendas, negociação, prospecção" {...field} />
                      </FormControl>
                      <FormDescription>Separe por vírgula.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Capa e instrutor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem de capa</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professor</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da dona/professora" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preço e publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-[1fr_0.7fr] lg:grid-cols-1 xl:grid-cols-[1fr_0.7fr]">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            disabled={isFree}
                            {...field}
                            value={isFree ? 0 : field.value}
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Moeda</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AOA">AOA</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Curso gratuito</FormLabel>
                        <FormDescription>Remove a necessidade de pagamento.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowPreview"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Pré-visualização</FormLabel>
                        <FormDescription>
                          Permite mostrar aulas marcadas como grátis.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasPromotion"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Em promoção</FormLabel>
                        <FormDescription>Marca o curso para campanhas futuras.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificateEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Certificado</FormLabel>
                        <FormDescription>Emite certificado após conclusão.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publicado</FormLabel>
                        <FormDescription>Torna o curso visível no catálogo.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="h-12 w-full bg-blue-900" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> A guardar...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Guardar curso
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
