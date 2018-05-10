import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AutenticacaoService{

    public token_id: string;

    constructor(private router: Router){ }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth()
                .createUserWithEmailAndPassword(usuario.email, usuario.senha)
                .then((resposta: any) => {
                    // Remover a senha do atibuto do usuário.
                    delete usuario.senha;
                    firebase.database()
                    .ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
                })
                .catch((error: Error) => console.log(error));
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth()
        .signInWithEmailAndPassword(email, senha)
        .then((resposta: any) =>  {
            firebase.auth().currentUser.getIdToken()
            .then((tokenId: string) => {
                this.token_id = tokenId;
                localStorage.setItem('token_id', this.token_id);
                this.router.navigate(['/home']);
            })
        })
        .catch((error: Error) => {
            console.log(error);
        });
    }

    public autenticado(): boolean {
        let storageToken = localStorage.getItem('token_id');
        if(this.token_id === undefined && storageToken != null) {
            this.token_id = storageToken;
        }

        if(this.token_id === undefined){
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined;
    }

    public sair(): void {
        firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.removeItem('token_id');
            this.token_id = undefined;
            this.router.navigate(['/']);
        });
    }
}