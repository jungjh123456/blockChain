const SHA256 = require('crypto-js/sha256');
// block 클래스를 만들고 생성자를 지정하자.

class Block {
	constructor(index, timestemp, data, previousHash = '') {
		// index는 옵션이고 블록이 체인에서 어디에 있는지 알려준다.
		// 타임 스탬프는 블록이 생성 된시기를 알려주고 데이터와 블록과 연결하려는 모든 유형의 데이터가
		// 포함될 수 있다. 반복되는 트랜잭션 세부 정보를 저장하고 싶을때 사용한다.
		// previousHash는 다음 해시를 포함하는 문자열이다. 이 블록 이전 블록은 중요하다.
		this.index = index;
		this.timestemp = timestemp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash(); // 블록의 해시를 계산한다.
	}

	// 이 함수가 할 일은 해시 함수를 계산하는 것이다.
	// 이 블록은 이 블록의 속성을 가져와서 실행한다.
	calculateHash() {
		//sha-256을 해시 함수로 사용하자. 기본 자바스크립트에서 사용할 수 없다. 그래서 실제로
		// 라이브러리를 사용하자.
		return SHA256(this.index + this.previousHash + this.timestemp + JSON.stringify(this.data)).toString();
	}
}

// 체인을 위한 클래스

class BlockChain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, '01/01/2017', 'Genesis block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	} // 마지막 요소 가져와라

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

const savjeeCoin = new BlockChain();
savjeeCoin.addBlock(new Block(1, '10/07/2017', { amount: 4 }));
savjeeCoin.addBlock(new Block(2, '12/07/2017', { amount: 10 }));
console.log(JSON.stringify(savjeeCoin, null, 4));
