import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginUser } from "@/utils/api";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalido').required('Email e obrigatório'),
      password: Yup.string().min(6, 'Senha muito curta').required('Senha e obrigatório'),
    }),
    onSubmit: async (values) => {
      try{
        await loginUser(values);
        toast({
          title: "Login realizado com sucesso",
          description: "Login realizado com sucesso",
        })
        router.push("/");
      }
      catch(error){
        toast({
          title: "Erro ao realizar o login",
          description: error instanceof Error ? error.message : 'Erro desconhecido',
        })
      }
    }, 
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login no Bidnow</CardTitle>
        <CardDescription>Entre com suas credenciais para acessar sua conta no Bidnow</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...formik.getFieldProps('email')}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <Link href="/auth/signup" className="text-sm underline">Não possui uma conta</Link>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}