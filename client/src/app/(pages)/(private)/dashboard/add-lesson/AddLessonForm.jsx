'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  accessType,
  lessonCategory,
  lessonEmotionalTone,
} from '@/lib/dummy-data/lessonCategory';
import { Button } from '@/components/ui/button';
import { LuImagePlus } from 'react-icons/lu';
import { useState, useCallback, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FaCircleDot } from 'react-icons/fa6';
import { authClient, getToken } from '@/lib/auth-client';
import { RiLock2Line } from 'react-icons/ri';
import { IoFlashOutline } from 'react-icons/io5';
import { Crown } from 'lucide-react';
import { LessonFormSchema } from './lessonFormSchema';
import { Separator } from '@/components/ui/separator';
import { AddNewLessonAction } from '@/actions/AddNewLesson.action';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const AddLessonForm = () => {
  const [image, setImage] = useState('');
  const { data } = authClient.useSession();
  const [formPending, startFormPending] = useTransition();
  const user = data?.user;

  const form = useForm({
    resolver: zodResolver(LessonFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      category: '',
      emotionalTone: '',
      accessLevel: '',
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setImage(previewUrl);
        form.setValue('image', file);
      },
      [form],
    ),
    accept: {
      'image/*': [],
    },
  });

  const handleReset = () => {
    form.reset();
    setImage('');
  };

  const onSubmit = (values) => {
    startFormPending(async () => {
      const token = await getToken();
      const result = await AddNewLessonAction(values, token);
      if (result.success) {
        toast.success(result.message ?? 'Lesson added successfully');
        handleReset();
      } else {
        toast.error(result.message ?? 'Error: Upload failed');
      }
    });
  };

  return (
    <Card
      className={cn(
        'max-w-200 mx-auto p-3 py-10 rounded-md',
        formPending && 'pointer-events-none opacity-40 select-none',
      )}
    >
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className={'uppercase'}
                  >
                    Lesson Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. The strengths found in vulnerability"
                    autoComplete="off"
                    className="h-auto py-2 rounded-md !bg-transparent"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className={'uppercase'}
                  >
                    Full Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Start your story here..."
                    autoComplete="off"
                    className="h-auto py-2 rounded-md min-h-50 !bg-transparent"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="w-full flex gap-3 items-center justify-between">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className={'uppercase'}
                    >
                      Category
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px] rounded-md h-auto py-4.5 !bg-transparent">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {lessonCategory.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="emotionalTone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className={'uppercase'}
                    >
                      Emotional Tone
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px] rounded-md h-auto py-4.5 !bg-transparent">
                        <SelectValue placeholder="Emotional tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {lessonEmotionalTone.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className={'uppercase'}
                  >
                    Featured Image (Optional)
                  </FieldLabel>
                  <div
                    {...getRootProps()}
                    className={cn(
                      'w-full rounded-md border-2 border-dashed relative h-70 overflow-hidden bg-muted flex flex-col items-center justify-center gap-2 duration-200',
                      isDragActive && 'border-muted-foreground',
                    )}
                  >
                    <input {...getInputProps()} />
                    {image ? (
                      <Image
                        fill
                        alt="preview"
                        src={image}
                        className="w-full h-full object-cover pointer-events-none select-none"
                      />
                    ) : (
                      <>
                        <LuImagePlus className="size-12 text-muted-foreground" />
                        <CardTitle>Click to upload or drag and drop</CardTitle>
                        <CardDescription className="text-sm">
                          PNG, JPG, JPEG (Recommended: 16:9 ratio)
                        </CardDescription>
                      </>
                    )}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="w-full flex gap-3 items-center justify-between">
              <Controller
                name="accessLevel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className={'uppercase'}
                    >
                      Access Level
                    </FieldLabel>
                    <div className="flex items-center gap-5 w-full">
                      {accessType.map((item) => {
                        const isSelected = field.value === item;
                        const isPremium = user?.plan === 'premium';
                        const isPro = item === 'premium' && !isPremium;
                        return (
                          <Button
                            disabled={item === 'premium' && !isPremium}
                            onClick={() => field.onChange(item)}
                            key={item}
                            type="button"
                            variant="outline"
                            className={cn(
                              'capitalize w-[calc(50%-10px)] h-auto py-2 rounded-md opacity-70 justify-between',
                              isSelected && 'opacity-100 !border-primary/60',
                              isPro && 'cursor-not-allowed',
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <FaCircleDot />
                              {item}
                            </span>

                            {item === 'free' ? (
                              <IoFlashOutline />
                            ) : isPremium ? (
                              <Crown className="mr-2 h-4 w-4" />
                            ) : (
                              <RiLock2Line />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <Separator className="my-10" />

          <span className="flex justify-start gap-3">
            <Button type="submit" className="h-auto py-2 px-5">
              {formPending ? (
                <>
                  <Spinner /> Proccessing
                </>
              ) : (
                'Publish Wisdom'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-auto py-2 px-5"
            >
              Reset
            </Button>
          </span>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddLessonForm;
