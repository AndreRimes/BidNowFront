"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/utils/api";
import { userSession } from "@/utils/types";


export default function UserInfo({ user}: { user: userSession | null }) {
    const { toast } = useToast();
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast({
                title: "Sessão terminada com sucesso",
                description: "Você foi desconectado com sucesso",
            });
            router.push("/auth/login");
        },
        onError: (error) => {
            toast({
                title: "Erro ao desconectar",
                description: error.message,
            })
        }
    })

    return (
        <div className="w-full flex flex-col items-center gap-5">
            <h1 className="text-center text-5xl font-black">Meu Perfil</h1>
            <div className="flex flex-row flex-grow justify-between gap-4 w-11/12 h-fit bg-white bg-background rounded-lg p-5">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <h3 className="text-xl">Email: {user?.email}</h3>
                    <h3 className="text-xl" >Senha: ******</h3>
                    <Button variant={"outline"}>Alterar Senha</Button>
                </div>
                <div>
                    <LogOut onClick={() => mutate()} className="text-primary cursor-pointer" />
                </div>
            </div>
        </div>
    );
}