'use client'
import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '@/utils/api'
import { useRouter } from 'next/navigation'


const validationSchema = Yup.object({
    title: Yup.string()
        .required('Título do produto é obrigatório'),
    description: Yup.string()
        .required('Descrição do produto é obrigatória'),
    price: Yup.number()
        .required('Preço é obrigatório')
        .min(0, 'O preço deve ser maior ou igual a 0'),
})

export default function CreateProjectForm() {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const {mutate: create} = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            toast({
                title: "Produto criado com sucesso",
                description: "Produto criado com sucesso",
            });
            router.push("/");
        },
        onError: (error) => {
            toast({
                title: "Erro ao criar produto",
                description: error.message,
            })
        }
    })

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const droppedFiles = Array.from(e.dataTransfer.files).map(file => file as File)
        setFiles([...files, ...droppedFiles]);
    }

    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName) as File[])
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Criar Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Formik
                        initialValues={{ title: '', description: '', price: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            if (files.length <= 0) {
                                toast({
                                    title: "Erro ao criar produto",
                                    description: "Você precisa fazer upload de algum arquivo",
                                });
                                return;
                            }
                        
                            const formData = new FormData();
                            formData.append("title", values.title);
                            formData.append("description", values.description);
                            formData.append("minimalPrice", values.price);
                        
                            files.forEach((fileItem) => {
                                const fileObject = new File([fileItem], fileItem.name, { type: fileItem.type });
                                formData.append('files', fileObject);
                            });
                        
                            await create(formData);
                        }
                    }
                    >
                        {({ }) => (
                            <Form className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título do produto</Label>
                                    <Field as={Input} name="title" id="title" placeholder="Digite o título do produto" className="w-full" />                                   
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descrição do produto</Label>
                                    <Field as={Textarea} name="description" id="description" placeholder="Digite a descrição do produto" className="min-h-[100px]" />                                    
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Preço inicial do produto</Label>
                                    <Field as={Input} name="price" id="price" type="number" placeholder="0.00" className="w-full" />                                    
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-4">
                                    <Label>Faça Upload </Label>
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="h-8 w-8 text-gray-400" />
                                            <p className="text-lg font-medium">Arraste e solte o aquivo aqui</p>
                                            <p className="text-sm text-gray-500">Somente aquivos de imagem são permitidos</p>
                                        </div>
                                    </div>

                                    {files.length > 0 && (
                                        <div className="space-y-2">
                                            {files.map((file) => (
                                                <div
                                                    key={file.name}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFile(file.name)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full" size="lg">
                                    Criar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}


