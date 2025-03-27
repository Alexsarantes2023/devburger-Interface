import PropTypes from 'prop-types';
import { ContainerButton } from "./styles";

//spreed operator ...props recebe todos os parametros automaticamente de mensagem que colocar
export function Button({ children, ...props }) {
    return <ContainerButton {...props}>{children}</ContainerButton>;
}

Button.propTypes = {
    children: PropTypes.string,
};