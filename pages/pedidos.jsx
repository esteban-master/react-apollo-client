import AppLayout from "../components/AppLayout";
import TokenService from "../services/token.service";

const Pedidos = () => {
  return (
    <AppLayout title="CRM | Pedidos">
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const tokenService = new TokenService();
  await tokenService.autenticatedToken(context);
  return {
    props: {},
  };
}

export default Pedidos;
