import { getFullnodeUrl, PaginatedObjectsResponse, QueryEventsParams, SuiClient, SuiEvent, SuiEventFilter, SuiObjectData } from '@mysten/sui/client';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';

const programAddress = "";

export async function newProjectTx(name: string, hasLeaderboards: boolean, hasAcheivements: boolean): Promise<Transaction | undefined>{
	if(name){
		const tx = new Transaction();
		tx.moveCall({ target: programAddress+"::gamesuite_sui::create_profile", arguments: [
            tx.pure.string(name),
            tx.pure.bool(hasLeaderboards),
            tx.pure.bool(hasAcheivements),
			coinWithBalance({balance: 20000000})
		]});
		return tx;
	}else{
		alert("Create a profile to begin playing!");
	}
	return undefined;
}

export async function newLeaderboardTx(projectCapAddy: string, name: string, unit: string, description: string, sortDesc: boolean, projectId: string, projectObjVersion: number, publicKey: number[]): Promise<Transaction | undefined>{
	// if(?){
        let elements: any[] = [];
        publicKey.forEach((el) => {
            elements.push(tx.pure.string(el+""));
        });
		const tx = new Transaction();
		tx.moveCall({ target: programAddress+"::gamesuite_sui::create_leaderboard", arguments: [
            tx.object(projectCapAddy),
            tx.pure.string(name),
            tx.pure.string(unit),
            tx.pure.string(description),
            tx.pure.bool(sortDesc),
            tx.sharedObjectRef({
                objectId: projectId,
                mutable: true,
                initialSharedVersion: projectObjVersion
              }),
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
            