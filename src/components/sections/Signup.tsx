import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik"
import { useMutation } from "@tanstack/react-query"
import * as Yup from "yup"
import { createUser } from "@/utils/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  nome: Yup.string().required('Nome is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[@$!%*?&]/, 'Password must contain a special character')
    .required('Password is required')
})

export default function Signup() {
    const router = useRouter();
    const { toast } = useToast();


    const { mutate: signup } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            router.push("/auth/login");
            toast({
                title: "Cadastro realizado com sucesso",
                description: "Cadastro realizado com sucesso, so falta realizar o login",
            })
        },
        onError: (error) => {
            toast({
                title: "Erro ao realizar o cadastro",
                description: error.message,
            })
        }
    })


  const formik = useFormik({
    initialValues: {
      email: '',
      nome: '',
      password: ''
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
        signup({
            email: values.email,
            password: values.password,
            name: values.nome,
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Signup no Bidnow</CardTitle>
          <CardDescription>Entre as suas credenciais para criar uma conta no Bidnow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.nome && formik.errors.nome ? (
                <div className="text-red-500 text-sm">{formik.errors.nome}</div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <Link href="/auth/login" className="text-sm underline">Ja possui uma conta</Link>
            <Button disabled={formik.isSubmitting || !formik.isValid} type="submit" className="w-full">
              Signup
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}