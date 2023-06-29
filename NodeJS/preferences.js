exports.updatePreferences = async (user) => {
    // Store user preferences here in any way you want: 
    // write them to a spreadsheet, a database, etc.
};

exports.getPreferences = async (user) => {
    // Fetch already-stored user preferences

    // Sample return:
    // (hardcoded for demo purposes)
    return {
        "source_language": "English",
        "target_language": "Luganda"
    }
};
