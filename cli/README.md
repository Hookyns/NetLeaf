# NetLeft CLI

Install package `netleaf` globally.

```
npm i netleaf -g
```

## Commands

### new
Creates a new project based on the specified template.
``` 
netleaft new {TEMPLATE}
```

### add
Because all the packages have quite long name, there is the `add` command which use abbreviations.
Its looks for the packages in the npm registry too. NetLeaf packages have priority.
``` 
netleaft add configuration
```

Search matches by double tapping TAB.
> TODO: http://registry.npmjs.com/-/v1/search?text=test