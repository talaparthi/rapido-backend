// Load configuration properties from a json file

module.exports = {
  port: process.env.npm_package_config_port,
  database : {
    host: process.env.npm_package_config_db_host,
    port: process.env.npm_package_config_db_port,
    database: process.env.npm_package_config_db_name,
    user: process.env.npm_package_config_db_user,
    password: process.env.npm_package_config_db_password
  },
  nodemailer: {
    testmode: process.env.npm_package_config_nodemailer_testmode,
    options: process.env.npm_package_config_nodemailer_options,
    paths: {
      verification: process.env.npm_package_config_nodemailer_path_verification
    }
  },

  load: function(configFile) {

    // try to load defaults from the npm config
    this.port = process.env.npm_package_config_port;
    this.database = {
      host: process.env.npm_package_config_db_host,
      port: process.env.npm_package_config_db_port,
      database: process.env.npm_package_config_db_name,
      user: process.env.npm_package_config_db_user,
      password: process.env.npm_package_config_db_password
    };
    this.nodemailer = {
      testmode: process.env.npm_package_config_nodemailer_testmode,
      options: process.env.npm_package_config_nodemailer_options,
      paths: {
        verification: process.env.npm_package_config_nodemailer_path_verification
      }
    }

    // override npm config with json file
    if( configFile ) {
      try {
        var configJSON = require(configFile)
        if( configJSON.database.host ) { this.database.host = configJSON.database.host };
        if( configJSON.database.port ) { this.database.port = configJSON.database.port };
        if( configJSON.database.name ) { this.database.database = configJSON.database.name };
        if( configJSON.database.user ) { this.database.user = configJSON.database.user };
        if( configJSON.database.password ) { this.database.password = configJSON.database.password };
        if( configJSON.port ) { this.port = configJSON.port };
        if( configJSON.nodemailer.testmode ) { this.nodemailer.testmode = configJSON.nodemailer.testmode };
        if( configJSON.nodemailer.options ) { this.nodemailer.options = configJSON.nodemailer.options };
        if( configJSON.nodemailer.paths.verification ) { this.nodemailer.paths.verification = configJSON.nodemailer.paths.verification };
      }
      catch (e) {
          console.error('Unable to load file ' + configFile);
          console.error(e);
      }
    }

    // override all config with  environment variables
    if( process.env.RAPIDO_DATABASE_HOST ) { this.database.host = process.env.RAPIDO_DATABASE_HOST }
    if( process.env.RAPIDO_DATABASE_PORT ) { this.database.port = parseInt(process.env.RAPIDO_DATABASE_PORT) }
    if( process.env.RAPIDO_DATABASE_NAME ) { this.database.database = process.env.RAPIDO_DATABASE_NAME }
    if( process.env.RAPIDO_DATABASE_USER ) { this.database.user = process.env.RAPIDO_DATABASE_USER }
    if( process.env.RAPIDO_DATABASE_PASSWORD ) { this.database.password = process.env.RAPIDO_DATABASE_PASSWORD }
    if( process.env.RAPIDO_PORT ) { this.port = parseInt(process.env.RAPIDO_PORT) }
    if( process.env.RAPIDO_MAIL_TESTMODE ) { this.nodemailer.testmode = process.env.RAPIDO_MAIL_TESTMODE }
    if( process.env.RAPIDO_MAIL_OPTIONS ) { this.nodemailer.options = process.env.RAPIDO_MAIL_OPTIONS }
    if( process.env.RAPIDO_MAIL_PATH_VERIFICATION ) { this.nodemailer.paths.verification = process.env.RAPIDO_MAIL_PATH_VERIFICATION }
  }
}
