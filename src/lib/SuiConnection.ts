import { getFullnodeUrl, PaginatedObjectsResponse, QueryEventsParams, SuiClient, SuiEvent, SuiEventFilter, SuiObjectData } from '@mysten/sui/client';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { graphql } from '@mysten/sui/graphql/schemas/latest';
import { SuiGraphQLClient } from '@mysten/sui/graphql';
import { ed25519 } from '@noble/curves/ed25519';

const OGprogramAddress = "0x0abddd10ef6d65db73e4ea7ba61fc1107d811c19a88d0304ac1d173c980b7434";
const programAddress = "0x0abddd10ef6d65db73e4ea7ba61fc1107d811c19a88d0304ac1d173c980b7434";

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
	const myQuery = getOwnedObjectsByTypeQuery(`"${OGprogramAddress}::${type}"`, `"${owner}"`);
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

export async function newLeaderboardTx(projectCapAddy: string, name: string, unit: string, description: string, sortDesc: boolean, projectId: string, projectObjVersion: number, publicKey: number[], myAddy: string, priv: boolean): Promise<Transaction | undefined>{
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
            tx.object(projectCapAddy),
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
			coinWithBalance({balance: 20000000}),
			tx.pure.bool(priv)
		]});
		return tx;
	// }else{
	// 	alert("Create a profile to begin playing!");
	// }
	// return undefined;
}

export async function submitScore(): Promise<Transaction | undefined>{
	// if(?){
		let privK = "44de8f8981d9d8b46152a6746889a23425f84a7962fc6b0aaed7500cbaf893a7";
		let lbId = "0x413794a8701c22b1fac6628285853621ca353c75d6be86eb47cf71844d6cd463";
		let addy = "8418bb05799666b73c4645aa15e4d1ccae824e1487c01a665f51767826d192b7";
		let score = 201;

	// console.log(projectCapAddy);
	// console.log(projectId);
	// console.log(name);
	// console.log(unit);
        let elements: any[] = [];
		let elements2: any[] = [];
		const tx = new Transaction();
		// publicKey.forEach((el) => {
        //     elements.push(tx.pure.u8(el));
        // });
		console.log(ed25519.getPublicKey(privK));
		const message = `${addy}${score}`;
		const messageBuffer = Buffer.from(message);
		// const messageHash = messageBuffer.toString('hex');
		console.log(messageBuffer);
		// Sign the message
		const signature = ed25519.sign(messageBuffer, privK); //wink
		signature.forEach((el) => {
            elements.push(tx.pure.u8(el));
        });
		console.log(signature);
		console.log();
		messageBuffer.forEach((el) => {
            elements2.push(tx.pure.u8(el));
        });

		tx.setSender(addy);
		tx.moveCall({ target: programAddress+"::leaderboard::submit_score", arguments: [
            tx.sharedObjectRef({
                objectId: lbId,
                mutable: true,
                initialSharedVersion: 529404996
              }),
			//   tx.pure.address("0x8418bb05799666b73c4645aa15e4d1ccae824e1487c01a665f51767826d192b7"),
			  tx.pure.u64(score),
			//   tx.pure.string(description),
			// tx.makeMoveVec({type: "u8", elements: elements2}),
            tx.makeMoveVec({type: "u8", elements: elements})
			// coinWithBalance({balance: 20000000})
		]});
		return tx;
	// }else{
	// 	alert("Create a profile to begin playing!");
	// }
	// return undefined;
}


// coinWithBalance({type: "0xd9fc80a30c89489764bc07f557dc17162a477d34a9b44e65aae48af8ead006e7::FFIO::FFIO", balance: 39*10000*OneCoinNineDecimals}), // Using gas as the payment, this is just for example. Adjust accordingly.
            