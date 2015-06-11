"use strict";
/* clinical variation of a protein */

// Record variants to a protein sequence
var PROTEIN_CHANGE = /p\.(\w\w\w)(\d+)\w\w\w/;
function ResidueSet(name, color, gene) {
    this.variants = {}; // residue numer in Uniprot sequence => Amino Acid
    this._name = name;
    this._color = color;
    this._gene = gene;
}
ResidueSet.prototype.addVariant = function(variant /* e.g p.Arg844His */) {
    var match = PROTEIN_CHANGE.exec(variant);
    // console.log("variant: "+variant);
    if (!match) { throw "Unexpected variant representation: " + variant; }
    this.variants[Number(match[2])] = match[1].toUpperCase();
};
ResidueSet.prototype.contains = function(variant /* e.g p.Arg844His */) {
    var match = PROTEIN_CHANGE.exec(variant);
    if (!match) { return false; }
    return this.variants[Number(match[2])];
};
// for each chain in a PV view, call this to decorate it
ResidueSet.prototype.getPVSelector = function(offset, chain) { // TODO _offset
    var c = this.variants;
    return function(residue) {
        // TODO if not in start..end, then HETATM, not amino acid
        var expected = c[residue.num() + offset]; // chain_.offset
        if (!expected) { return false; }
        if (expected != residue._name) { return false; // TODO throw
                                                        // residue._chain.name()+residue.num()+"
        // expected: "+expected+", but is: "+residue._name;
        }
        console.log("Residue to decorate: " + chain + residue.num());
        return true;
    };
};

function onLoadVariants(xml, table, gene) {
    console.log("onloadvariants: " + gene);
    var pathogenic = new ResidueSet('Pathogenic', 'red', gene);
    var mixed = new ResidueSet('Mixed', 'yellow', gene);
    var benign = new ResidueSet('Benign', 'green', gene);
    var summaries = xml.documentElement.getElementsByTagName("DocumentSummary");
    var numProteinChanges = 0;
    for ( var i = 0; i < summaries.length; i++) {
        var summary = summaries[i];
        var title = summary.getElementsByTagName('title')[0].textContent;
        var significance = summary.getElementsByTagName('description')[0].textContent;
        if (/x\d+$/.test(title)) {
            continue; // ignore copy number variation
        }
        var change = summary.getElementsByTagName('cdna_change')[0].textContent
                || summary.getElementsByTagName('variation_name')[0].textContent;
        if (!change) {
            // console.log(summary);
            continue;
        }
        if (/p\.\w\w\w\d+=/.test(change)) {
            // console.log("Synonymous: "+change);
            continue; // e.g. c.5850T>C (p.Ala1950=)
        }
        if (/del/i.test(change)) {
            // console.log("Deletion: "+change);
            continue; // e.g. c.3963-78_4242+577del e.g. c.881_882delAA
            // (p.Lys294Thrfs)
        }
        if (PROTEIN_CHANGE.test(change)) {
            var rs = mixed;
            if (significance.toLowerCase().contains("pathogenic")
                    && !benign.contains(change)) {
                rs = pathogenic;
            } else if (significance.toLowerCase().contains("benign")
                    && !pathogenic.contains(change)) {
                rs = benign;
            }
            rs.addVariant(change);
            numProteinChanges++;
        } else if (/fs/.test(change)) {
            console.log("Frame Shift: " + change);
            continue;
        } else {
            console.log("Cannot process: " + change); // e.g. c.3718-1G>A
            if (!significance.toLowerCase().contains("pathogenic")) {
                continue;
            }
        }

        var row = table.insertRow();
        // TODO what if elements are repeated?
        // TODO flag up those changes that will be displayed
        row.insertCell().textContent = change;
        row.insertCell().textContent = significance;

        var td = row.insertCell();
        // console.log(title+summary.getElementsByTagName('variation_xrefs')[0]);
        var xref = summary.getElementsByTagName('variation_xrefs')[0]
                .getElementsByTagName('variation_xref')[0];
        if (!xref) {
            td.textContent = title;
        } else {
            var link = document.createElement('a');
            var db = xref.getElementsByTagName('db_source')[0].textContent
                    .toLowerCase();
            var id = xref.getElementsByTagName('db_id')[0].textContent;
            if ('omim' === db) {
                link.href = 'http://www.omim.org/entry/' + id.replace('.', '#');
            } else if ('dbsnp' === db) {
                link.href = 'http://www.ncbi.nlm.nih.gov/snp/' + id;
            } else {
                link.href = 'http://www.ncbi.nlm.nih.gov/' + db + '/?term='
                        + id;
            }
            link.textContent = title;
            td.appendChild(link);
        }
    }
    // display with the residue sets
    if (decorator) {
        decorator.addResidueSet(pathogenic);
        decorator.addResidueSet(benign);
        // mixed last, this overrides other annotations
        decorator.addResidueSet(mixed);
    }
    reportProgress('Found ' + numProteinChanges
            + ' variant residues for gene: ' + gene);
}

// e.g. getVariants('FLNA', function(xml) {console.log(xml);})
function getVariants(gene, callback) {

    var xhr = new XMLHttpRequest();
    xhr
            .open(
                    'GET',
                    'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&field=gene&retmode=json&retmax=0&usehistory=y&term='
                            + gene);
    xhr.timeout = 15 * 1000;
    xhr.overrideMimeType("application/json");
    xhr.ontimeout = function(e) {
        alert('Sorry, no response from ClinVar in ' + xhr.timeout / 1000 + 's '
                + e);
    };
    xhr.onerror = function(e) {
        alert('Sorry, error getting results from ClinVar: ' + e);
    };
    xhr.onload = function(e) {
        console.log(xhr.status);
        var json = JSON.parse(xhr.response)['esearchresult'];
        if (!json) {
            console.log(xhr.response);
            throw 'Sorry, query has failed';
        }
        reportProgress(gene + ' Checking ' + json.count + ' variants ...');
        var xhr2 = new XMLHttpRequest();
        xhr2.overrideMimeType("application/json");
        xhr2.open('GET',
                'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?WebEnv='
                        + json.webenv + '&db=clinvar&query_key='
                        + json.querykey);
        xhr2.timeout = 15 * 1000;
        xhr2.ontimeout = function(e) {
            alert('Sorry, no response from ClinVar in ' + xhr2.timeout / 1000
                    + 's ' + e);
        };
        xhr2.onerror = function(e) {
            alert('Sorry, error getting results from ClinVar: ' + e);
        };
        xhr2.onload = function(e) {
            console.log(xhr2.status);
            var xml = xhr2.responseXML;
            if (null == xml) {
                xml = new DOMParser().parseFromString(xhr2.responseText,
                        "application/xml");
            }
            callback(xml);
            console.log("processed variants for: " + gene);
        };
        xhr2.send();
    };
    xhr.send();
}

function getChildrenTextContent(element) {
    var ret = {};
    var children = element.childNodes;
    for ( var i = 0; i < children.length; i++) {
        if (1 == children[i].nodeType) {
            var child = children[i];
            ret[child.localName] = child.textContent;
            // console.log(child.localName+' '+child.textContent);
        }
    }
    return ret;
}

function getVariantsForPdbEntry(accession) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.rcsb.org/pdb/files/' + accession.toUpperCase()
            + '-noatom.xml');
    xhr.timeout = 15 * 1000;
    xhr.overrideMimeType("text/xml");
    xhr.ontimeout = function(e) {
        alert('Sorry, no response from PDB in ' + xhr.timeout / 1000 + 's ' + e);
    };
    xhr.onerror = function(e) {
        alert('Sorry, error getting results from PDB: ' + e);
    };
    xhr.onload = function(e) {
        var xml = xhr.responseXML;
        if (null == xml) {
            xml = new DOMParser().parseFromString(xhr.responseText,
                    "application/xml");
        }
        console.log(xhr.status);
        if (404 === xhr.status) {
            alert("PDB entry not found: " + accession);
        } else {
            var entry = new PdbEntry(xml);
            entry.render(document.getElementById('results'));
        }
    };
    xhr.send();
}

function PdbEntry(xml) {
    var PDBx = "http://pdbml.pdb.org/schema/pdbx-v40.xsd";

    function parseUnique(element, elementName, method) {
        var elements = element.getElementsByTagNameNS(PDBx, elementName);
        if (1 != elements.length) {
            console.log(xml);
            throw "Expected one: " + elementName + ", found: "
                    + elements.length;
        }
        return method(elements[0]);
    }

    // element PDBx:struct_ref_seqCategory
    // could also process _dif_ records
    // TODO check there are no _ins_ records
    function parseStructRefSeqCategory(element) {
        var ret = [];
        var summaries = element.getElementsByTagNameNS(PDBx, "struct_ref_seq");
        for ( var i = 0; i < summaries.length; i++) {
            var summary = summaries[i];
            ret.push(getChildrenTextContent(summary));
        }
        return ret;
    }

    function parseStructRefCategory(element) {
        var ret = {}
        var summaries = element.getElementsByTagNameNS(PDBx, "struct_ref");
        for ( var i = 0; i < summaries.length; i++) {
            var summary = summaries[i];
            var id = summary.getAttribute("id");
            var map = getChildrenTextContent(summary);
            ret[id] = map;
        }
        return ret;
    }

    this.ref = parseUnique(xml, "struct_refCategory", parseStructRefCategory);
    this.refSeq = parseUnique(xml, "struct_ref_seqCategory",
            parseStructRefSeqCategory);

}
PdbEntry.prototype.log = function() {
    console.log('Ref' + this.ref + '\nRefSeq' + this.refSeq);
}
PdbEntry.prototype.render = function(table) {

    // remove old rows
    var rows = table.rows;
    for (i = 0; i < rows.length; i++) {
        if ('th' == rows[i].firstChild.tagName) {
            // headers
        } else {
            table.deleteRow(i);
        }
    }

    // process each chain
    for ( var i = 0; i < this.refSeq.length; i++) {
        var seq = this.refSeq[i];

        var row = table.insertRow();
        row.insertCell().textContent = seq["pdbx_strand_id"];
        row.insertCell().textContent = seq["seq_align_beg"];
        row.insertCell().textContent = seq["seq_align_end"];

        var r = this.ref[seq["ref_id"]];
        var link = document.createElement("a");
        link.title = r["pdbx_db_accession"];
        if ('UNP' === r["db_name"]) {
            link.href = 'http://www.uniprot.org/uniprot/' + link.title;
        } else {
            link.href = '#';
        }
        link.textContent = r["db_code"];
        row.insertCell().appendChild(link);
        // "db_align_beg" seems to be less accurate
        row.insertCell().textContent = seq["pdbx_auth_seq_align_beg"];
        row.insertCell().textContent = seq["pdbx_auth_seq_align_end"];
        if (decorator) {
            decorator.addChain(r["db_code"], seq["pdbx_strand_id"],
                    seq["pdbx_auth_seq_align_beg"] - seq["seq_align_beg"]); // TODO
            // integer
        }

    }
    // now process each gene
    document.getElementById('variation').innerHTML = '';
    for ( var i = 0; i < Object.keys(this.ref).length; i++) {
        var ref = this.ref[Object.keys(this.ref)[i]];
        var refTable = document.createElement('table');
        // refTable.id= ref["db_code"];
        var caption = document.createElement('caption');
        caption.textContent = 'Clinical variation of ' + ref["db_code"];
        refTable.appendChild(caption);
        var headers = refTable.insertRow();
        headers.insertCell().textContent = 'Change';
        headers.insertCell().textContent = 'Significance';
        headers.insertCell().textContent = 'Details';
        document.getElementById('variation').appendChild(refTable);
        var gene = ref["db_code"] + '';
        var geneInClinvar = gene;
        if (gene.endsWith("_HUMAN")) {
            geneInClinvar = gene.substring(0, gene.length - 6);
        }
        refTable.caption.innerHTML += '<a href="http://www.ncbi.nlm.nih.gov/clinvar?term='
                + geneInClinvar
                + '%5Bgene%5D'
                + '" title="variants for '
                + gene
                + '">ClinVar</a> '
                // could (9606[Taxonomy ID]) AND , could [Gene ID]
                + '<a href="http://swissvar.expasy.org/cgi-bin/swissvar/result?global_textfield='
                + geneInClinvar + '">SwissVar</a> ';
        // now find the variants
        getVariants(geneInClinvar, getVariantsCallback(refTable, gene));

    }
};

function getVariantsCallback(refTable, gene) {
    // bind the parameters, by the time it is called the loop with have
    // proceeded
    return function(xml) {
        onLoadVariants(xml, refTable, gene);
    }
}
