include Make.jscomp

##############################
# Methods
##############################
define TOFLAGS
$(foreach flag, $(2), -f $(strip $(1)) -f $(flag))
endef

##############################
# Definitions
##############################
GSS_RENAME = NONE
DEBUG_FLAG = -f --define -f goog.DEBUG=false
PRETTY_PRINT = --pretty-print
FORMATTING.compressed =
COMPILATION_LEVEL.compressed = SIMPLE_OPTIMIZATIONS

##############################
# Directories
##############################
SRC_DIR = core
CLOSURE_LIBRARY_DIR = ../closure-library-read-only
CLOSURE_COMPILER_DIR = ../closure-compiler-read-only
CLOSURE_STYLESHEETS_DIR = ../closure-stylesheets-read-only
CLOSURE_TEMPLATES_DIR = ../closure-templates-read-only

##############################
# Compilers & their flags
##############################
SOY_COMPILER = $(CLOSURE_TEMPLATES_DIR)/build/SoyToJsSrcCompiler.jar
SOY_FLAGS = --cssHandlingScheme GOOG --useGoogIsRtlForBidiGlobalDir --shouldProvideRequireSoyNamespaces --shouldGenerateGoogMsgDefs 

GSS_COMPILER = $(CLOSURE_STYLESHEETS_DIR)/build/closure-stylesheets.jar
GSS_FLAGS = $(PRETTY_PRINT) --output-renaming-map-format CLOSURE_COMPILED --rename $(GSS_RENAME) --allowed-unrecognized-property user-select

CLOSURE_COMPILER = $(CLOSURE_COMPILER_DIR)/build/compiler.jar
CLOSURE_BUILDER = $(CLOSURE_LIBRARY_DIR)/closure/bin/build/closurebuilder.py
CLOSURE_DEPSWRITER = $(CLOSURE_LIBRARY_DIR)/closure/bin/build/depswriter.py

##############################
# Inputs
##############################
IN_SOY = $(wildcard $(SRC_DIR)/*.soy)
IN_SOY_JS = $(addsuffix .js, $(IN_SOY))
IN_RENAMING_JS = $(SRC_DIR)/blockly_renaming_map.js
IN_GSS = $(wildcard $(SRC_DIR)/*.gss)
IN_JS = $(filter-out $(IN_SOY_JS) $(IN_RENAMING_JS), $(wildcard $(SRC_DIR)/*.js)) $(IN_SOY_JS) $(OUT_RENAMING_JS)
IN_EXTERN_CONFS = $(wildcard externs/gen/*.conf)
IN_EXTERN_CONFS_JS = $(patsubst externs/gen/%.conf, externs/%.js, $(IN_EXTERN_CONFS))
IN_EXTERN_JS = $(filter-out $(IN_EXTERN_CONFS_JS), $(wildcard externs/*.js)) $(OUT_EXTERN_CONFS_JS)

##############################
# Targets
##############################
OUT_COMPILED_JS = blockly_compressed.js
OUT_JS = $(OUT_COMPILED_JS) blockly_core_deps.js blockly_core.js
OUT_RENAMING_JS = $(IN_RENAMING_JS)
OUT_CSS = media/blockly.css
OUT_SOY_JS = $(IN_SOY_JS)
OUT_EXTERN_CONFS_JS = $(IN_EXTERN_CONFS_JS)

OUTPUTS = $(OUT_JS) $(OUT_SOY_JS) $(OUT_RENAMING_JS) $(OUT_CSS) $(OUT_EXTERN_CONFS_JS)
TMP_OUTPUTS = $(addsuffix .tmp, $(OUTPUTS))

##############################
# Rules
##############################
all: $(OUTPUTS)

.PHONY: all clean

clean:
	-rm -f $(OUTPUTS)

$(SOY_COMPILER): $(CLOSURE_TEMPLATES_DIR)/java/src/com/google/template/soy/SoyToJsSrcCompiler.java
	(cd $(CLOSURE_TEMPLATES_DIR); ant SoyToJsSrcCompiler)

$(CLOSURE_COMPILER): $(CLOSURE_COMPILER_DIR)/src/com/google/javascript/jscomp/*
	(cd $(CLOSURE_COMPILER_DIR); ant jar)

$(GSS_COMPILER): $(CLOSURE_STYLESHEETS_DIR)/src/com/google/common/css/*
	(cd $(CLOSURE_STYLESHEETS_DIR); ant jar)

$(addsuffix .tmp, $(OUT_SOY_JS)): %.js.tmp: % $(SOY_COMPILER)
	java -jar $(SOY_COMPILER) $(SOY_FLAGS) --outputPathFormat $@ --srcs $<
	perl -pi -e 's/soy/goog.soy/g; s/soydata/soy.data/g' $@

$(addsuffix .tmp, $(OUT_RENAMING_JS)): $(OUT_CSS)
$(addsuffix .tmp, $(OUT_CSS)): $(IN_GSS) $(GSS_COMPILER)
	java -jar $(GSS_COMPILER) $(GSS_FLAGS) --output-renaming-map $(OUT_RENAMING_JS).tmp --output-file $@ $(IN_GSS)
	perl -pi -e "print qq/goog.provide('Blockly.renaming_map');\n/ if ($$. == 1);" $(OUT_RENAMING_JS).tmp

$(addsuffix .tmp, $(OUT_COMPILED_JS)): blockly_%.js.tmp : blockly_core.js $(CLOSURE_COMPILER) $(OUT_RENAMING_JS) $(IN_EXTERN_JS)
	python $(CLOSURE_BUILDER) $(DEBUG_FLAG) -c $(CLOSURE_COMPILER) --root $(CLOSURE_LIBRARY_DIR) --root $(SRC_DIR) -o compiled -f --compilation_level -f $(COMPILATION_LEVEL.$*) $(FORMATTING.$*) $(JSCOMP_ERROR_FLAGS) $(call TOFLAGS, --externs, $(IN_EXTERN_JS)) --namespace Blockly.core --output_file $@ $<

$(OUT_EXTERN_CONFS_JS).tmp : externs/%.js.tmp : externs/gen/%.conf externs/gen/gen.pl
	perl externs/gen/gen.pl $< > $@

blockly_core_deps.js.tmp: blockly_core.js $(IN_JS) $(OUT_RENAMING_JS)
	python $(CLOSURE_DEPSWRITER) --root_with_prefix "$(CLOSURE_LIBRARY_DIR) $(CLOSURE_LIBRARY_DIR)" --root_with_prefix "$(SRC_DIR) $(SRC_DIR)" $< --output_file $@
	perl -pi -e "s|'([^/]+?.js)'|'../../../blockly/\\1'|;s|'core/|'../../../blockly/core/|; s|'$(CLOSURE_LIBRARY_DIR)|'../..|;" $@

blockly_core.js.tmp: $(IN_JS) $(OUT_RENAMING_JS)
	env PYTHONPATH=$$PYTHONPATH:$(CLOSURE_LIBRARY_DIR)/closure/bin/build python requireprovides.py $(IN_JS) -p Blockly.core -o $@

# Copies for all tmp files to their resting home
.INTERMEDIATE: $(TMP_OUTPUTS)
$(OUTPUTS): % : %.tmp
	mv $< $@

##############################
# Debugging rules
##############################
ECHO_%:
	@echo "$*=$($*)"
