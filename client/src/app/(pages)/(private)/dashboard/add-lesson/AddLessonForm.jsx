'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
import { Crown, X } from 'lucide-react';
import { LessonFormSchema } from './lessonFormSchema';
import { Separator } from '@/components/ui/separator';
import { AddNewLessonAction } from '@/actions/AddNewLesson.action';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { uploadImage } from '@/actions/helpers/uploadImage';

const AddLessonForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const { data } = authClient.useSession();
  const [formPending, startFormPending] = useTransition();
  const user = data?.user;
  const isPremium = user?.plan === 'premium' || user?.role === 'admin';

  const form = useForm({
    resolver: zodResolver(LessonFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      category: '',
      emotionalTone: '',
      accessLevel: '',
      isPublic: true,
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setImageFile(file);
        form.setValue('image', previewUrl);
      },
      [form],
    ),
    accept: {
      'image/*': [],
    },
  });

  const handleReset = () => {
    form.reset();
    setImageFile(null);
  };

  const handleCancelImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    form.setValue('image', undefined);
  };

  const onSubmit = (values) => {
    startFormPending(async () => {
      const token = await getToken();
      const updatedValues = values;
      if (imageFile) {
        const res = await uploadImage(imageFile);
        if (res) {
          const { url: imageUrl } = res;
          updatedValues.image = imageUrl;
        }
      }
      const result = await AddNewLessonAction(updatedValues, token);
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
        'max-w-200 mx-auto sm:px-3 sm:py-10 py-2 rounded-md',
        formPending && 'pointer-events-none opacity-40 select-none',
      )}
    >
      <CardContent className="sm:px-4 px-2">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* TITLE */}
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

            {/* DESCRIPTION */}
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
              {/* CATEGORY */}
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

              {/* EMOTIONAL TONE */}
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

            {/* IMAGE */}
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
                    {field.value ? (
                      <div className="w-full h-full relative">
                        <Image
                          fill
                          src={field.value}
                          alt="preview"
                          className="w-full h-full object-cover pointer-events-none select-none"
                        />
                        <Button
                          type="button"
                          variant={'destructive'}
                          onClick={handleCancelImage}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full z-1"
                        >
                          <X />
                        </Button>
                      </div>
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

            {/* IS PUBLIC */}
            <Controller
              name="isPublic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={'flex '}>
                  <div className="flex items-center gap-2">
                    <FieldLabel className="uppercase">visibility:</FieldLabel>
                    <Switch
                      defaultChecked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="mr-2">
                      {field.value ? 'Public' : 'Private'}
                    </span>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="w-full flex gap-3 items-center justify-between">
              {/* ACCESS LEVEL */}
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

          <Separator className="sm:my-10 my-5" />

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
