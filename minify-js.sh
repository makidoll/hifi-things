if [ -z "$1" ]
then
	echo "sh minify-js.sh [filename.js]"
else
	uglifyjs $1 -o ${1::-3}".min.js" -c -m 
fi