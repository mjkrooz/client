import { useQuery } from "@tanstack/react-query";
import {
  GetAllRequest,
  GetByIDRequest,
  Round,
} from "@buf/grpc_web_scoretrak_scoretrakapis/scoretrak/round/v1/round_pb";
import grpcWeb from "grpc-web";
import { gRPCClients } from "../../grpc/gRPCClients";

export function useRoundsQuery() {
  async function fetchRounds() {
    const roundsResponse = await gRPCClients.round.v1.roundServicePromiseClient.getAll(
      new GetAllRequest(),
      {}
    );
    return roundsResponse.getRoundsList();
  }

  return useQuery<Round[], grpcWeb.RpcError>(["rounds"], fetchRounds);
}

export function useRoundQuery(roundId: string) {
  async function fetchRoundById(id: string) {
    const request = new GetByIDRequest().setId(parseInt(id));
    const roundResponse = await gRPCClients.round.v1.roundServicePromiseClient.getAll(request, {});
    return roundResponse.getRoundsList();
  }

  return useQuery<Round[], grpcWeb.RpcError>(["rounds"], () =>
    fetchRoundById(roundId)
  );
}
