let fs = require('fs')
let arg = process.argv;
let data= fs.readFileSync('Huffman.txt');
data= data.toString();

    function Power(data) {
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] != data[i + 1]) {
                return false;
            }
        }
        return true;
    }

    let decodedString = '';
    let codedString = '';
    let codes = [];
    let dictionaryCodes = "";
    let flag = Power(data);
    if (flag) {
        codedString = ''
        for (i = 0; i < data.length; i++) {
            codedString += "0";
        }
        codes = {a: '0'};
        for (i = 0; i < data.length; i++) {
            decodedString += data[0];
        }
    } else {
        function node(letter, freq, used, father, code, rightChild, leftChild, index) {
            this.letter = letter;
            this.freq = freq;
            this.used = used;
            this.father = father;
            this.code = code;
            this.rightChild = rightChild;
            this.leftChild = leftChild;
            this.index = index;
        }

        let alph = new Array();
        for (let i = 0; i < data.length; i++) {   
            alph[data.charAt(i)] = 0;
        }
        let powerAlph = 0;    
        for (let i = 0; i < data.length; i++) {
            alph[data.charAt(i)] += 1;
            powerAlph++;
        }
        let tree = new Array(); 
        let index = 0;
        for (p in alph) {
            let n = new node(p, alph[p], false, null, '', null, null, index);
            tree.push(n);    
            index++;
        }
        long  = tree.length;
        for (let i = 0; i < long - 1; i++) {
            let min = data.length;
            let num1;
            let num2;
            for (let k = 0; k < tree.length; k++) {
                if (min > tree[k].freq && !tree[k].used) {
                    min = tree[k].freq;
                    num1 = k;
                }
            }
            tree[num1].used = true;
            tree[num1].father = tree.length;
            tree[num1].code = '0';
            let minS = data.length;
            for (let i = 0; i < tree.length; i++) {
                if (minS > tree[i].freq && !tree[i].used) {
                    minS = tree[i].freq;
                    num2 = i;
                }
            }

            tree[num2].used = true;
            tree[num2].father = tree.length;
            tree[num2].code = '1';
            let indexB = tree.length;
            let n = new node(tree[num1].letter + tree[num2].letter, tree[num1].freq + tree[num2].freq, false, null, '', tree[num2].index, tree[num1].index, tree.length)
            tree.push(n);
        }
        for (let i = 0; i < long; i++) {
            let g = i;
            codes[tree[g].letter] = '';
            while (tree[g].father != null) {
                codes[tree[i].letter] = tree[g].code + codes[tree[i].letter];
                g = tree[g].father;

            }
        }

        dictionaryCodes = '';
        for (let x in codes) {
            dictionaryCodes = dictionaryCodes + `${x}: '${codes[x]}' \n`
        }


        for (let i = 0; i < data.length; i++) {
            let j = data[i];
            codedString += codes[j];
        }

        function DecodeString(str, derevo, coren) {
            let decodeString = ''
            let root = coren
            for (i = 0; i < str.length; i++) {
                if (str[i] === "0") {
                    root = derevo[root.leftChild]
                }
                if (str[i] === '1') {
                    root = derevo[root.rightChild]
                }
                if (root.leftChild === null && root.rightChild === null) {
                    decodeString += root.letter
                    root = coren
                }
            }
            return decodeString
        }

        decodedString = DecodeString(codedString, tree, tree[tree.length - 1])

    }
    fs.writeFile('coded.txt', codedString, (err) => {
        if (err) {
            console.error(err)
            return;
        }
    });
    fs.writeFile('decoded.txt', decodedString, (err) => {
        if (err) {
            console.error(err)
            return;
        }
    });
    if (dictionaryCodes.length==0) {
        dictionaryCodes = `${data[0]}: '0'`
    }
    fs.writeFile('dictionary.txt', dictionaryCodes, (err) => {
        if (err) {
            console.error(err)
            return;
        }
    });