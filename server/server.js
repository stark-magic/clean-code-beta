const ronin 		= require( 'ronin-server' )
const mocks 		= require( 'ronin-mocks' )
const UrlHelper		= require( './util/urlHelper' )
const mongo 		= require( 'mongodb' ).MongoClient

//
// Main Function
//
async function main() {
	applicationName = "Clean Code Application";
	try {

    const server = ronin.server({
			port: process.env.PORT || 8080
		})

		const connstr = process.env.DB_CONN_STR;
		const db = await mongo.connect( connstr, { useNewUrlParser: true, useUnifiedTopology: true } )

	  server.use( '/services/', mocks.server( server.Router(), false, true ) )
	  server.use( '/services/v2/people', function( req, res ) {
		let sql = "SELECT * FROM "+ req.params.sql;

		const urlHelper = UrlHelper();
		console.info( 'urlHelper: '+ urlHelper.url )
	  })

    const result = await server.start()
    console.info( result )

	} catch( error ) {
				console.error( error )
	}

}

main()
