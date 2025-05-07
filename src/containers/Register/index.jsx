/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link, } from './styles';

import { Button } from '../../components';
import { api } from '../../services/api';


export function Register() {
  const navigate = useNavigate();
//schemas de validação com yup onde temos as nossas informaçoes dos nossos campos de input
  const schema = yup.object({
    name: yup.string().required('O nome é Obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no minimo 6 caracteres.').required('Digite uma senha'),
    //oneOff comparando as password
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirmar sua senha'),
  }).required();

  //yupresolver foi importado ajuda a validar os compos no nosso schema
  //desestruturação criando tres variaveis chamadas register, handleSubmit, formState
  //register estou registrando meus inputs, handleSubmit lida com a submissao do formulario, 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  //toda vez que eu click no botao recebemos as informaçoes de onSubmit em data
  //temos abaixo uma aeron function
  // const onSubmit = data => console.log(data);
  //enviando de submit para data para a api comunicando
  const onSubmit = async (data) => {

    try {
      const { status } = await api.post('users',
			{
				name: data.name,
				email: data.email,
				password: data.password,
			},
			{
				validateStatus: () => true,
			},
		);

		if (status === 200 || status === 201) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      toast.success('Conta criado com sucesso!');
		} else if (status === 409) {
			toast.error('Email já cadastrado! Faça o login para continuar');
		} else {
			throw new Error(); //qualquer outro erro manda o erro para o catch
		}
		} catch (error) {
			toast.error('Falha no Sistema! Tente novamente');
		}


  };
  


  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar Conta</Title>
        {/* conectivo onSubmit para o formhook e validaçao */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input type="text" {...register("name")} />
            {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
            <p>{errors?.name?.message}</p>
          </InputContainer>

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

          <InputContainer>
            <label>Confirmar Senha</label>
            {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
            <input type="password" {...register("confirmPassword")}/>
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit">Criar Conta</Button>
        </Form>
        <p>Já possui conta? <Link to="/login">Clique aqui.</Link></p>
        
      </RightContainer>
    </Container>
  );
}




// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import { toast } from 'react-toastify';

// import Logo from '../../assets/logo.svg';
// import { Container, LeftContainer, RightContainer, Title, Form, InputContainer } from './styles';

// import { Button } from '../../components/Button';
// import { api } from '../../services/api';


// export function Register() {

// //schemas de validação com yup onde temos as nossas informaçoes dos nossos campos de input
//   const schema = yup.object({
//     name: yup.string().required('O nome é Obrigatório'),
//     email: yup.string().email('Digite um e-mail válido').required('O email é obrigatório'),
//     password: yup.string().min(6, 'A senha deve ter no minimo 6 caracteres.').required('Digite uma senha'),
//     //oneOff comparando as password
//     confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirmar sua senha'),
//   }).required();

//   //yupresolver foi importado ajuda a validar os compos no nosso schema
//   //desestruturação criando tres variaveis chamadas register, handleSubmit, formState
//   //register estou registrando meus inputs, handleSubmit lida com a submissao do formulario, 
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema)  
//   });
//   //toda vez que eu click no botao recebemos as informaçoes de onSubmit em data
//   //temos abaixo uma aeron function
//   // const onSubmit = data => console.log(data);
//   //enviando de submit para data para a api comunicando
//   const onSubmit = async data => {
//     const response = await toast.promise(

//       api.post('/users', {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       }),
//         {
//           pending: 'Verificando seus dados',
//           success: 'Cadastro efetuado com Sucesso 👌',
//           error: 'Ops, algo deu errado! Tente novamente. 🤯',
//         },
//     );
      
      
      
      
    
//     console.log(response);
//   };

//   return (
//     <Container>
//       <LeftContainer>
//         <img src={Logo} alt="logo-devburger" />
//       </LeftContainer>
//       <RightContainer>
//         <Title>Criar Conta</Title>
//         {/* conectivo onSubmit para o formhook e validaçao */}
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <InputContainer>
//             <label>Nome</label>
//             <input type="text" {...register("name")} />
//             {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
//             <p>{errors?.name?.message}</p>
//           </InputContainer>

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

//           <InputContainer>
//             <label>Confirmar Senha</label>
//             {/* Elvis operator nas validaçoes de ero para nao dar erro quando vazio sem erros*/}
//             <input type="password" {...register("confirmPassword")}/>
//             <p>{errors?.confirmPassword?.message}</p>
//           </InputContainer>
//           <Button type="submit">Criar Conta</Button>
//         </Form>
//         <p>Já possui conta? <a>Clique aqui.</a></p>
        
//       </RightContainer>
//     </Container>
//   );
// }