import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Cake, PartyPopper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { createBirthday } from "@/api/Birthday";

const birthdaySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no puede superar los 30 caracteres"),

  birthday_date: z
    .string()
    .min(1, "La fecha de cumpleaños es obligatoria")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Ingresa una fecha válida",
    }),

  social_circle: z.enum(["FAMILY", "FRIENDS"], {
    error: "Selecciona un círculo social",
  }),
});

type BirthdayFormValues = z.infer<typeof birthdaySchema>;

export function FormBirthday() {
  const [selectKey, setSelectKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BirthdayFormValues>({
    resolver: zodResolver(birthdaySchema),
    defaultValues: {
      name: "",
      birthday_date: "",
      social_circle: undefined,
    },
  });

  const onSubmit: SubmitHandler<BirthdayFormValues> = async (data) => {
    try {
      await createBirthday(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error al crear cumpleaños:", error);
    }
  };

  function handleReset() {
    reset({
      name: "",
      birthday_date: "",
      social_circle: undefined,
    });
    setSelectKey((prev) => prev + 1);
    setSubmitted(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Agregar
          <Cake size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2 pb-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <Cake size={30} className="text-green-600" />
            </div>
            <span className="text-xl font-semibold">Añade un Cumpleañero</span>
          </DialogTitle>
        </DialogHeader>

        {/* Estado de exito */}
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <PartyPopper size={48} className="text-pink-500" />
            <p className="text-lg font-medium">¡Cumpleañero guardado!</p>
            <p className="text-sm text-muted-foreground">
              El cumpleaños fue registrado correctamente.
            </p>
            <Button onClick={handleReset} className="mt-2">
              Agregar otro
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

            {/* Nombre */}
            <div className="space-y-1.5">
              <Label htmlFor="fullname">
                Nombre completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Ej: Juan Jaldin"
                aria-invalid={!!errors.name}
                className={errors.name ? "border-red-500 focus-visible:ring-red-400" : ""}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* fecha */}
            <div className="space-y-1.5">
              <Label htmlFor="birthday_date">
                Fecha de cumpleaños <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthday_date"
                type="date"
                aria-invalid={!!errors.birthday_date}
                className={errors.birthday_date ? "border-red-500 focus-visible:ring-red-400" : ""}
                {...register("birthday_date")}
              />
              {errors.birthday_date && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.birthday_date.message}
                </p>
              )}
            </div>

            {/* circulo social */}
            <div className="space-y-1.5">
              <Label>
                Círculo social <span className="text-red-500">*</span>
              </Label>
              <Controller
                control={control}
                name="social_circle"
                render={({ field }) => (
                  <Select
                    key={selectKey}
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger
                      className={`w-full ${errors.social_circle ? "border-red-500 focus:ring-red-400" : ""}`}
                      aria-invalid={!!errors.social_circle}
                    >
                      <SelectValue placeholder="Selecciona un círculo social" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="FAMILY">Familia</SelectItem>
                        <SelectItem value="FRIENDS">Amigos</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.social_circle && (
                <p className="text-sm text-red-500" role="alert">
                  {errors.social_circle.message}
                </p>
              )}
            </div>

            {/* botones */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                Limpiar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-600">
                {isSubmitting ? "Guardando..." : "Guardar Cumpleaños"}
              </Button>
            </div>

          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
