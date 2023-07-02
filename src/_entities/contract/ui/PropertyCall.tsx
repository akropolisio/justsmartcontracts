import { Spin, Alert } from "antd";
import { useContractRead } from "wagmi";
import { TContract, TAbiFunction } from "../model";
import { FormattedValue } from "./FormattedValue";

type TProps = {
  contract: TContract;
  abi: TAbiFunction;
};

export const PropertyCall = ({ contract, abi }: TProps) => {
  const { data, error, isLoading } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    //@ts-ignore somehow TS thinks functionName is of undefined type
    functionName: abi.name,
  });

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    <Alert message={error.message} type="error" />;
  }

  return <FormattedValue value={data} abiType={abi.outputs[0]} />;
};
