let i = 3;

function Primo(n){
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    if (n < 1 ) return false;
    if (n == 1) return false;
        
    while (i * i <= n) {  
      if (n % i === 0) return false;
      i += 2;  
    }
    
    return true;
  }

console.log(Primo(0));      
console.log(Primo(1));    
console.log(Primo(2));      
console.log(Primo(3));      
console.log(Primo(7));      
console.log(Primo(83));     
console.log(Primo(100));    
console.log(Primo(991));    
console.log(Primo(104729)); 
console.log(Primo(14348907)); 
