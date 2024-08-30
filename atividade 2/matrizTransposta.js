let transposta = [];
let a;

function Matriz(A) {

   
   for (let i = 0; i < A[0].length; i++) {
       transposta[i] = [];
       for (let j = 0; j < A.length; j++) {
           transposta[i][j] = A[j][i];
       }
   }

   
   console.log("matriz original:");
   for (let i = 0; i < A.length; i++) {
       console.log(A[i].join(" "));
   }

   
   console.log("matriz transposta:");
   for (let i = 0; i < transposta.length; i++) {
       console.log(transposta[i].join(" "));
   }
}


A = [
   [1, 2],
   [3, 4],
   [5, 6]
];

Matriz(A);