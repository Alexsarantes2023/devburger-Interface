// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";


// import Logo from '../../assets/logo.svg';
// import { Container, LeftContainer, RightContainer, Title, Form, InputContainer } from './styles';

// import { Button } from '../../components/Button';


// export function Login() {

// //schemas de validação com yup onde temos as nossas informaçoes dos nossos campos de input
//   const schema = yup.object({
//     email: yup.string().email('Digite um e-mail válido').required('O email é obrigatório'),
//     password: yup.string().min(6, 'A senha deve ter no minimo 6 caracteres.').required('Digite uma senha'),
//   }).required();

//   //yupresolver foi importado ajuda a validar os compos no nosso schema
//   //desestruturação criando tres variaveis chamadas register, handleSubmit, formState
//   //register estou registrando meus inputs, handleSubmit lida com a submissao do formulario,
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema)
//   });
//   //toda vez que eu click no botao recebemos as informaçoes de onSubmit em data
//   //temos abaixo uma aeron function
//   const onSubmit = data => console.log(data);


//   return (
//     <Container>
//       <LeftContainer>
//         <img src={Logo} alt="logo-devburger" />
//       </LeftContainer>
//       <RightContainer>
//         <Title>
//           Olá, seja bem vindo ao
//           <span> Dev Burguer!</span>
//           <br/>
//           Acesse com seu
//           <span> Login e senha.</span>
//         </Title>
//         {/* conectivo onSubmit para o formhook e validaçao */}
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <InputContainer>
//             <label>Email</label>
//             <input type="email" {...register("email")} />
//             {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
//             <p>{errors?.email?.message}</p>
//           </InputContainer>

//           <InputContainer>
//             <label>Senha</label>
//             {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
//             <input type="password" {...register("password")}/>
//             <p>{errors?.password?.message}</p>
//           </InputContainer>
//           <Button type="submit">Entrar</Button>
//         </Form>
//         <p>Não possui conta? <a>Clique aqui.</a></p>
        
//       </RightContainer>
//     </Container>
//   );
// }

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from 'react-toastify';

import Logo from '../../assets/logo.svg';
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link, } from './styles';

import { Button } from '../../components/Button';
import { api } from '../../services/api.js';


export function Login() {
  const navigate = useNavigate();
//schemas de validação com yup onde temos as nossas informaçoes dos nossos campos de input
  const schema = yup.object({
    email: yup.string().email('Digite um e-mail válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no minimo 6 caracteres.').required('Digite uma senha'),
  }).required();

  //yupresolver foi importado ajuda a validar os compos no nosso schema
  //desestruturação criando tres variaveis chamadas register, handleSubmit, formState
  //register estou registrando meus inputs, handleSubmit lida com a submissao do formulario, 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)  
  });
  //toda vez que eu click no botao recebemos as informaçoes de onSubmit em data
  //temos abaixo uma aeron function
  // const onSubmit = data => console.log(data);
  //enviando de submit para data para a api comunicando
  const onSubmit = async data => {
    const {data: { token },}  = await toast.promise(
      api.post('/session', {
        email: data.email,
        password: data.password,
      }),
        {
          pending: 'Verificando seus dados',
          success: {
            render() {
              setTimeout(() => {
                navigate('/');
              }, 2000);
              return 'Seja Bem-vindo(a) 👌'
            }},
          error: 'Email ou Senha Incorretos 🤯',
        },
    );
      
    localStorage.setItem('token', token);
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao
          <span> Dev Burguer!</span>
          <br/>
          Acesse com seu 
          <span> Login e senha.</span>
        </Title>
        {/* conectivo onSubmit para o formhook e validaçao */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
            <input type="password" {...register("password")}/>
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>Não possui conta? <Link to="/cadastro">Clique aqui.</Link></p>
        
      </RightContainer>
    </Container>
  );
}