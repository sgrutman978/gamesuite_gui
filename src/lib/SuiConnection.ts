import { getFullnodeUrl, PaginatedObjectsResponse, QueryEventsParams, SuiClient, SuiEvent, SuiEventFilter, SuiObjectData } from '@mysten/sui/client';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { graphql } from '@mysten/sui/graphql/schemas/latest';
import { SuiGraphQLClient } from '@mysten/sui/graphql';

const programAddress = "0x45a40a4f75cf436e51026c09fe4aaaa0afbacd67ad7b249ca35d6121c06df24c";

const gqlClient = new SuiGraphQLClient({
	url: 'https://sui-mainnet.mystenlabs.com/graphql',
  });

  const genericNodesPartOfQuery = 
  `nodes {
	address
	digest
	asMoveObject {
	  contents { json }
	}
  }`

const getOwnedObjectsByTypeQuery = (type: string, owner: string) => graphql(`
    query {
      objects(filter: { type: ${type}, owner: ${owner} }) {
        ${genericNodesPartOfQuery}
      }
    }
  `);

  const getObjectsByIdsQuery = (listOfObjs: string) => graphql(`
    query {
      objects(filter: { objectIds: [${listOfObjs}] }) {
        ${genericNodesPartOfQuery}
      }
    }
  `);

  async function queryHelper(myQuery: any) {
    const result = await gqlClient.query({
      query: myQuery,
      variables: undefined
    });
    return result.data!.objects!;
  }

  export async function getMyProjects(type: string, owner: string): Promise<Record<string, any>> {
	console.log("uuuuu");
	const myQuery = getOwnedObjectsByTypeQuery(`"${programAddress}::${type}"`, `"${owner}"`);
	console.log(myQuery);
	return await queryHelper(myQuery);
  }

  export async function getProjectDetails(projectId: string): Promise<Record<string, any>> {
	console.log("uuu2uu");
	const myQuery = getObjectsByIdsQuery(`"${projectId}"`);
	console.log(myQuery);
	return await queryHelper(myQuery);
  }

  export async function getLeaderboardsDetails(leaderboardIds: string[]): Promise<Record<string, any>> {
	console.log("uuu2uu");
	let allIds = ``;
	console.log(leaderboardIds);
	leaderboardIds.forEach(id => {
		console.log("lslslslslslsl");
		console.log(id);
		allIds = `"${id}", ${allIds}`;
		console.log(allIds);
	});
	console.log(allIds);
	const myQuery = getObjectsByIdsQuery(allIds);
	console.log(myQuery);
	return await queryHelper(myQuery);
  }

export async function newProjectTx(name: string, hasLeaderboards: boolean, hasAcheivements: boolean, myAddy: string): Promise<Transaction | undefined>{
	if(name){
		const tx = new Transaction();
		tx.setSender(myAddy);
		tx.moveCall({ target: programAddress+"::leaderboard::create_project", arguments: [
            tx.pure.string(name),
            // tx.pure.bool(hasLeaderboards),
            // tx.pure.bool(hasAcheivements),
			coinWithBalance({balance: 20000000})
		]});
		return tx;
	}else{
		alert("Create a profile to begin playing!");
	}
	return undefined;
}

export async function newLeaderboardTx(projectCapAddy: string, name: string, unit: string, description: string, sortDesc: boolean, projectId: string, projectObjVersion: number, publicKey: number[], myAddy: string): Promise<Transaction | undefined>{
	// if(?){
	console.log(projectCapAddy);
	console.log(projectId);
	console.log(name);
	console.log(unit);
        let elements: any[] = [];
		const tx = new Transaction();
		publicKey.forEach((el) => {
            elements.push(tx.pure.u8(el));
        });
		tx.setSender(myAddy);
		tx.moveCall({ target: programAddress+"::leaderboard::create_leaderboard", arguments: [
            tx.object("0x3fc47a66f7c1fba58e48b0918ac4a32913d93d2dfef885e10ae48f62e5959c51"),
            tx.pure.string(name),
            tx.pure.string(unit),
			tx.pure.bool(sortDesc),
            tx.pure.string(description),
            tx.sharedObjectRef({
                objectId: projectId,
                mutable: true,
                initialSharedVersion: projectObjVersion
              }),
			//   tx.pure.string(description),
            tx.makeMoveVec({type: "u8", elements: elements}),
			coinWithBalance({balance: 20000000})
		]});
		return tx;
	// }else{
	// 	alert("Create a profile to begin playing!");
	// }
	// return undefined;
}


// coinWithBalance({type: "0xd9fc80a30c89489764bc07f557dc17162a477d34a9b44e65aae48af8ead006e7::FFIO::FFIO", balance: 39*10000*OneCoinNineDecimals}), // Using gas as the payment, this is just for example. Adjust accordingly.
            